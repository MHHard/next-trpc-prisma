import { createTRPCClient, httpBatchLink } from "@trpc/client";
import type { AppRouter } from "../server";
import { createTRPCReact } from "@trpc/react-query";
//     👆 **type-only** import
// Pass AppRouter as generic here. 👇 This lets the `trpc` object know
// what procedures are available on the server and their input/output types.
// const trpc = createTRPCClient<AppRouter>({
//   links: [
//     httpBatchLink({
//       url: "http://localhost:3000",
//     }),
//   ],
// });

// export const test = async () => {
//   // Inferred types
//   const user = await trpc.userById.query(1);
//   // const createdUser = await trpc.userCreate.mutate({
//   //   name: "sachinrajaa",
//   //   email: "1234567@qq.com",
//   // });
//   // const user2 = await trpc.whoami.mutate();
//   const user3 = await trpc.abc.query();
//   const user4 = await trpc.foo.query();
//   console.log(1234, user3);
// };
const trpc = createTRPCReact<AppRouter>();

export default trpc;
