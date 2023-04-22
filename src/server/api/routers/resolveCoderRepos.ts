import { Context } from "../types";

export const resolveCoderRepos = async ({
  ctx,
  keys,
}: {
  ctx: Context;
  keys: string[];
}): Promise<void> => {
  const { session, prisma } = ctx;

  const repos = await Promise.all(
    keys.map((key) => {
      return prisma.repository.upsert({
        where: {
          key,
        },
        update: { updatedAt: new Date() },
        create: {
          key,
        },
      });
    })
  );

  await Promise.all(
    repos.map((repo) => {
      return prisma.coderRepository.upsert({
        where: {
          coderId_repositoryId: {
            coderId: (session as any).coderId,
            repositoryId: repo.id,
          },
        },
        update: { updatedAt: new Date() },
        create: {
          coderId: (session as any).coderId,
          repositoryId: repo.id,
        },
      });
    })
  );
};
