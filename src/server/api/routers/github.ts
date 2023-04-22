import { z } from "zod";
import { protectedProcedure } from "../trpc";
import { createTRPCRouter } from "../trpc";
import axios from "axios";
import { GetRepositoriesResponse, GithubReposResponse } from "./types";
import fs from "fs";
import { promisify } from "util";
import AdmZip from "adm-zip";
import { resolveCoderRepos } from "./resolveCoderRepos";
import crypto from "crypto";

const writeFileAsync = promisify(fs.writeFile);
const mkdirSync = promisify(fs.mkdirSync);

export const githubRouter = createTRPCRouter({
  getRepositories: protectedProcedure
    .input(
      z.object({
        accessToken: z.string(),
      })
    )
    .query(async ({ input }): Promise<GetRepositoriesResponse> => {
      const { accessToken } = input;

      if (!accessToken) return { repositories: [] };

      const response = await axios.get<GithubReposResponse[]>(
        "https://api.github.com/user/repos",
        {
          headers: { Authorization: `token ${accessToken}` },
        }
      );

      const { data } = response;

      const privateRepos = data.filter((repo) => repo.private);

      return {
        repositories: privateRepos,
      };
    }),
  fetchAndSaveRepositories: protectedProcedure
    .input(
      z.object({
        accessToken: z.string(),
        repositoryIds: z.array(z.string()),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { accessToken, repositoryIds } = input;

      const repositories = await Promise.all(
        repositoryIds.map(async (repositoryId) => {
          const response = await axios.get(
            `https://api.github.com/repositories/${repositoryId}`,
            {
              headers: { Authorization: `token ${accessToken}` },
            }
          );

          const repo = response.data;

          const archiveUrl = repo.archive_url
            .replace("{archive_format}", "zipball")
            .replace("{/ref}", "/master");

          const archiveResponse = await axios.get(archiveUrl, {
            responseType: "arraybuffer",
            headers: { Authorization: `token ${accessToken}` },
          });

          const key = crypto
            .createHash("sha256")
            .update(repo.id.toString())
            .digest("hex");

          // Create the directory if it does not exist
          mkdirSync("./savedRepos/zip", { recursive: true });

          // Save the fetched code to disk
          const filePath = `./savedRepos/zip/${key}.zip`;

          await writeFileAsync(filePath, archiveResponse.data);

          const zip = new AdmZip(archiveResponse.data);

          // Create the directory if it does not exist
          mkdirSync("./savedRepos/full", { recursive: true });

          // Unzip the fetched repository and save it as a folder
          zip.extractAllTo(`./savedRepos/full/${key}`, true);

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
    }),
});

export default githubRouter;
