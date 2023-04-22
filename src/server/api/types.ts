import { createTRPCContext } from "@server";
import { type inferAsyncReturnType } from "@trpc/server";

export type Context = inferAsyncReturnType<typeof createTRPCContext>;
