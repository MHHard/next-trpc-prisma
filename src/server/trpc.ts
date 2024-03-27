import { TRPCError, initTRPC } from "@trpc/server";
import { NodeHTTPCreateContextFnOptions } from "@trpc/server/adapters/node-http";
import superjson from "superjson";

import { IncomingMessage, ServerResponse } from "http";
import { PrismaClient } from "@prisma/client";
import { ZodError } from "zod";
/**
 * Initialization of tRPC backend
 * Should be done only once per backend!
 */
type User = {
  id: number;
  name: String;
  email: String;
};

export type Context = {
  /**
   * User is nullable
   */
  user: User | null;
};
export const prisma = new PrismaClient();
// const t = initTRPC.create();
export const createContext = async (opts: any) => {
  // const session = await getSession({ req: opts.req });
  const context: Context = {
    user: { id: 11, name: "sachinrajaa", email: "1234567@qq.com" },
  };
  return {
    prisma,
    context,
  };
};
const t = initTRPC.context<typeof createContext>().create({
  transformer: superjson,
  errorFormatter({ shape, error }) {
    console.log(111111, shape);
    console.log(22222, error);
    shape.data.httpStatus = 200;
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError:
          error.cause instanceof ZodError ? error.cause.flatten() : null,
      },
    };
  },
});
/**
 * Export reusable router and procedure helpers
 * that can be used throughout the router
 */
export const router = t.router;
export const publicProcedure = t.procedure;
export const authedProcedure = t.procedure.use(async function isAuthed(opts) {
  const { ctx } = opts;
  console.log("opts222:", opts);
  if (!ctx.context.user) {
    // (property) user: User | null
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }

  return opts.next({
    ctx: {
      // ✅ user value is known to be non-null now
      user: ctx.context.user,
    },
  });
});
export const loggedProcedure = publicProcedure.use(async (opts) => {
  const start = Date.now();

  const result = await opts.next();

  const durationMs = Date.now() - start;
  const meta = { path: opts.path, type: opts.type, durationMs };

  result.ok
    ? console.log("OK request timing:", meta)
    : console.error("Non-OK request timing", meta);

  return result;
});
