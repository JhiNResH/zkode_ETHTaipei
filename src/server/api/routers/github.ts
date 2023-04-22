import { z } from "zod";
import { protectedProcedure } from "../trpc";
import { createTRPCRouter } from "../trpc";
import axios from "axios";

export const githubRouter = createTRPCRouter({
  getRepositories: protectedProcedure
    .input(
      z.object({
        accessToken: z.string(),
      })
    )
    .query(async ({ input }) => {
      const { accessToken } = input;

      const response = await axios.get("https://api.github.com/user/repos", {
        headers: { Authorization: `token ${accessToken}` },
      });

      console.log(response.data);

      return response.data;
    }),
});

export default githubRouter;
