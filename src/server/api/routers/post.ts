import { z } from "zod";
import waterLevels from "~/scripts/water_levels.json";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { scrapeWebsite } from "~/scripts/scrape";
import { isNil } from "lodash";

interface ParsedData {
  lastUpdated: string;
  data: {
    location: string;
    min: number;
    max: number;
    time: string;
  }[];
}

function getNumbers(aString: string | undefined) {
  if (!aString) {
    throw new Error("No string found");
  }
  const matches = /([+-]\d+)([+-]\d+)/.exec(aString);
  const firstNumber = matches?.[1] ? parseInt(matches[1]) : null;  // e.g., +35
  const secondNumber = matches?.[2] ? parseInt(matches[2]) : null; // e.g., -5 or +10

  if (isNil(firstNumber) || isNil(secondNumber)) {
    debugger;
    throw new Error("No numbers found");
  }

  return {max: firstNumber, min: secondNumber};
}

function parseData(aWaterLevels: typeof waterLevels): ParsedData {
  if (!aWaterLevels.data[0]) {
    console.error("No data found");
    throw new Error("No data found");
  }
  const result: ParsedData = {
    lastUpdated: aWaterLevels.lastUpdated,
    data: [],
  };

  for (const [index, location] of aWaterLevels.data[0].entries()) {
    const locationString = location.split("\n")[0]?.trim();
    if (!locationString) {
      console.error("No location string found");
      continue;
    }
    if (!aWaterLevels.data[2]) {
      console.error("No data found");
      continue;
    }
    if (!aWaterLevels.data[2][index]) {
      console.error("No data found");
      continue;
    }

            // Extract numeric values from strings like "+35-5⇒" or "+35+10⇓"
  const matches = /([+-]\d+)([+-]\d+)/.exec(aWaterLevels.data[2][index]);
  const firstNumber = matches?.[1] ? parseInt(matches[1]) : null;  // e.g., +35
  const secondNumber = matches?.[2] ? parseInt(matches[2]) : null; // e.g., -5 or +10
  
  if (!aWaterLevels.data[1]?.[0]) {
    throw new Error("No time found");
  }

  if (!firstNumber || !secondNumber) {
    throw new Error("No numbers found");
  }
  result.data.push({
    location: locationString,
    time: aWaterLevels.data[1][0],
    min: secondNumber,
    max: firstNumber,
  });

  let {min, max} = getNumbers(aWaterLevels.data[4]?.[index]);

  if (!aWaterLevels.data[3]?.[0]) {
    throw new Error("No time found");
  }

  result.data.push({
    location: locationString,
    time: aWaterLevels.data[3][0],
    min: min,
    max: max,
  });

  ({min, max} = getNumbers(aWaterLevels.data[6]?.[index]));

  if (!aWaterLevels.data[5]?.[0]) {
    throw new Error("No time found");
  }

  result.data.push({
    location: locationString,
    time: aWaterLevels.data[5][0],
    min: min,
    max: max,
  });
  }
  return result;
}

export const postRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),
    scrape: publicProcedure.mutation(async ({ctx}) => {
      const waterLevels = await scrapeWebsite();
      const parsedData = parseData(waterLevels);

      // First create/get all locations
      const locations = await Promise.all(
        parsedData.data.map(data => 
          ctx.db.locations.upsert({
            where: { name: data.location.toLowerCase() },
            create: { 
              name: data.location.toLowerCase(),
              display_name: data.location 
            },
            update: {}
          })
        )
      );

      // Then create predictions with location_id
      await ctx.db.predictions.createMany({
        data: parsedData.data
          .filter((_, i) => locations[i]?.id !== undefined)
          .map((data, i) => ({
            location_id: locations[i]!.id,
            predicted_level_min: data.min,
            predicted_level_max: data.max,
            prediction_time: data.time,
            last_data_update: parsedData.lastUpdated,
          })),
      });

      return;
    }),

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
