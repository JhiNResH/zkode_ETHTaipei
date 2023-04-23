import { z } from 'zod';
import { protectedProcedure } from '../trpc';
import { createTRPCRouter } from '../trpc';
import axios from 'axios';
import { GetRepositoriesResponse, GithubReposResponse } from './types';
import fs from 'fs';
import { promisify } from 'util';
import AdmZip from 'adm-zip';
import { resolveCoderRepos } from './resolveCoderRepos';
import crypto from 'crypto';
import { TRPCError } from '@trpc/server';
import { rimraf } from 'rimraf';
import fsExtra from 'fs-extra';

const mkdirSync = promisify(fs.mkdirSync);

export const githubRouter = createTRPCRouter({
  getRepositories: protectedProcedure
    .input(
      z.object({
        accessToken: z.string(),
      })
    )
    .query(async ({ input }): Promise<GetRepositoriesResponse> => {
      try {
        const { accessToken } = input;

        if (!accessToken) return { repositories: [] };

        const response = await axios.get<GithubReposResponse[]>('https://api.github.com/user/repos', {
          headers: { Authorization: `token ${accessToken}` },
        });

        const { data } = response;

        const privateRepos = data.filter((repo) => repo.private);

        return {
          repositories: privateRepos,
        };
      } catch (error) {
        const errorAsError = error as Error;

        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: errorAsError.message,
          cause: errorAsError,
        });
      }
    }),
  fetchAndSaveRepositories: protectedProcedure
    .input(
      z.object({
        accessToken: z.string(),
        repositoryIds: z.array(z.string()),
      })
    )
    .mutation(async ({ ctx, input }) => {
      try {
        const { accessToken, repositoryIds } = input;

        const repositories = await Promise.all(
          repositoryIds.map(async (repositoryId) => {
            const response = await axios.get(`https://api.github.com/repositories/${repositoryId}`, {
              headers: { Authorization: `token ${accessToken}` },
            });

            const repo = response.data;

            const archiveUrl = repo.archive_url.replace('{archive_format}', 'zipball').replace('{/ref}', '/master');

            const archiveResponse = await axios.get(archiveUrl, {
              responseType: 'arraybuffer',
              headers: { Authorization: `token ${accessToken}` },
            });

            const key = crypto.createHash('sha256').update(repo.id.toString()).digest('hex');

            mkdirSync('./temp', { recursive: true });

            const tempFolderPath = `./temp/${key}`;

            const tempZip = new AdmZip(archiveResponse.data);

            tempZip.extractAllTo(tempFolderPath, true);

            await rimraf(`${tempFolderPath}/.git`);

            const zip = new AdmZip();

            await zip.addLocalFolderPromise(tempFolderPath, {});

            mkdirSync('./savedRepos/zip', { recursive: true });

            const zipFilePath = `./savedRepos/zip/${key}.zip`;

            await zip.writeZipPromise(zipFilePath);

            mkdirSync('./savedRepos/full', { recursive: true });

            fsExtra.moveSync(tempFolderPath, `./savedRepos/full/${key}`, { overwrite: true });

            return key;
          })
        );

        await resolveCoderRepos({
          ctx,
          keys: repositories,
        });

        return {
          success: true,
        };
      } catch (error) {
        const errorAsError = error as Error;

        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: errorAsError.message,
          cause: errorAsError,
        });
      }
    }),
});

export default githubRouter;
