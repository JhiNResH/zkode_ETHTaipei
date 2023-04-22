import { z } from "zod";
import { protectedProcedure } from "../trpc";
import { createTRPCRouter } from "../trpc";
import axios from "axios";
import { GetRepositoriesResponse, GithubReposResponse } from "./types";

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
        repositories: z.array(z.string()),
      })
    )
    .mutation(async ({ input }) => {
      // const response = await axios.

      return {
        success: true,
      };
    }),
});

export default githubRouter;
