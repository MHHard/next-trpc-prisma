// import { db } from "./db";

import {
  Context,
  authedProcedure,
  createContext,
  loggedProcedure,
  prisma,
  publicProcedure,
  router,
} from "./trpc.ts";
import { PrismaClient } from "@prisma/client";
import { z } from "zod";
import { createHTTPServer } from "@trpc/server/adapters/standalone";

export const appRouter = router({
  test: publicProcedure.query(() => {
    return String(Math.random());
  }),
  whoami: authedProcedure.mutation(async (opts) => {
    // user is non-nullable here
    const { ctx } = opts;
    return ctx.user;
  }),
  userList: publicProcedure.query(async () => {
    // Retrieve users from a datasource, this is an imaginary database
    console.log(9999);
    const users = await prisma.user.findMany();
    return users;
  }),
  userById: publicProcedure.input(z.number()).query(async (opts) => {
    const { input } = opts;
    const user = await prisma.user.findUnique({ where: { id: input } });
    return user;
  }),
  userCreate: publicProcedure
    .input(z.object({ name: z.string(), email: z.string() }))
    .mutation(async (opts) => {
      const { input } = opts;
      // const input: {
      //   name: string;
      // };
      // Create a new user in the database
      const user = await prisma.user.create({
        data: input,
      });
      console.log(77777, user);
      return user;
    }),
  foo: loggedProcedure.query(() => "bar"),
  abc: loggedProcedure.query(() => "def"),
});
// const server = createHTTPServer({
//   router: appRouter,
//   createContext,
// });

// export const start = server.listen(3000);
console.log("server start");
export type AppRouter = typeof appRouter;
