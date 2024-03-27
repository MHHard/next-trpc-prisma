import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { type NextRequest } from "next/server";

import { appRouter } from "../../../server/index";
import { createContext } from "../../../server/trpc";
import { createNextApiHandler } from "@trpc/server/adapters/next";

/**
 * This wraps the `createTRPCContext` helper and provides the required context for the tRPC API when
 * handling a HTTP request (e.g. when you make requests from Client Components).
 */
const createContext2 = async (req: NextRequest) => {
  return createContext({
    headers: req.headers,
  });
};

// const handler = (req: NextRequest) => {
//   console.log(1212121212, req);
//   return fetchRequestHandler({
//     endpoint: "/api/trpc",
//     req,
//     router: appRouter,
//     createContext: () => createContext2(req),
//     onError:
//       process.env.NODE_ENV === "development"
//         ? ({ path, error }) => {
//             console.error(
//               `❌ tRPC failed on ${path ?? "<no-path>"}: ${error.message}`
//             );
//           }
//         : undefined,
//   });
// };

// export default handler;
export default createNextApiHandler({
  router: appRouter,
  createContext: createContext,
  onError:
    process.env.NODE_ENV === "development"
      ? ({ path, error }) => {
          console.error(
            `❌ tRPC failed on ${path ?? "<no-path>"}: ${error.message}`
          );
        }
      : undefined,
});
