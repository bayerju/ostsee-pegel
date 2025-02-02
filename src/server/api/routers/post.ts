import { z } from "zod";
import waterLevels from "~/scripts/water_levels.json";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { scrapeWebsite } from "~/scripts/scrape";
import { isNil } from "lodash";





export const postRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),
    // scrape: publicProcedure.mutation(async ({ctx}) => {
    //   const waterLevels = await scrapeWebsite();
    //   const parsedData = parseData(waterLevels);

    //   // First create/get all locations
    //   const locations = await Promise.all(
    //     parsedData.data.map(data => 
    //       ctx.db.locations.upsert({
    //         where: { name: data.location.toLowerCase() },
    //         create: { 
    //           name: data.location.toLowerCase(),
    //           display_name: data.location 
    //         },
    //         update: {}
    //       })
    //     )
    //   );

    //   // Then create predictions with location_id
    //   await ctx.db.predictions.createMany({
    //     data: parsedData.data
    //       .filter((_, i) => locations[i]?.id !== undefined)
    //       .map((data, i) => ({
    //         location_id: locations[i]!.id,
    //         predicted_level_min: data.min,
    //         predicted_level_max: data.max,
    //         prediction_time: data.time,
    //         last_data_update: parsedData.lastUpdated,
    //       })),
    //   });

    //   return;
    // }),

  // create: publicProcedure
  //   .input(z.object({ name: z.string().min(1) }))
  //   .mutation(async ({ ctx, input }) => {
  //     return ctx.db.post.create({
  //       data: {
  //         name: input.name,
  //       },
  //     });
  //   }),

  // getLatest: publicProcedure.query(async ({ ctx }) => {
  //   const post = await ctx.db.post.findFirst({
  //     orderBy: { createdAt: "desc" },
  //   });

  //   return post ?? null;
  // }),

});
