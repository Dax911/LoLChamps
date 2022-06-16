import * as trpcNext from "@trpc/server/adapters/next";
import superjson from "superjson";
import { z } from "zod";
import { createContext } from "../../../server/context";
import { createRouter } from "../../../server/create-router";

export const appRouter = createRouter()
  .transformer(superjson)
  /* 
   * Tore out the tRPC to make room for the three backend calls to a 3rd party API
   *
   * 
   * 1) fetch list of all available versions [endpoint A]
   *    a) user selects a version or defaults to latest
   *
   * 2) get all champions from specific version [endpoint B]
   *    a) select two Champions at random
   *        i) these chamapions have no intrinsic numerical association with each other they are identified by their names only so I need to turn the JSON into an array
   *        ii) select a random set of champions using Math.floor(Math.random() * the length of the array)
   *    b) present the two option to user who selects one this 
   *    c) trigger a vote mechanic that records both for and against data (see roundest-mon) however it also needs to include the version number
   *
   *
   *    RESULTS
   *    needs to do the same thing as roundest-mon however it need to be calculated only with the specific version selected by the user
   *
   *
   * 3) get specific champion data [endpoint C] if user clicks on more information button
   *
   * All of this can be done server side and should be server side
   */

// export type definition of API
export type AppRouter = typeof appRouter;

// export API handler
export default trpcNext.createNextApiHandler({
  router: appRouter,
  createContext: createContext,
});
