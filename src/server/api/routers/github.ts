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
    .query(async ({ input }): Promise<{ name: string }> => {
      const { accessToken } = input;

      // const response = await axios.get("https://api.github.com/user/repos", {
      //   headers: { Authorization: `token ${accessToken}` },
      // });

      console.log(accessToken, "hello");

      return { name: "bob" };
    }),
});

export default githubRouter;
