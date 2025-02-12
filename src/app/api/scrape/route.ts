import { NextResponse } from "next/server";
import puppeteer from "puppeteer";
import { db } from "~/server/db";
import { scrapeWebsite } from "~/scripts/scrape";
import type waterLevels from "~/scripts/water_levels.json";
import { isNil } from "lodash";
import { type ParsedData } from "./types";
// const BSH_URL =
//   "https://www.bsh.de/DE/DATEN/Vorhersagen/Wasserstand_Ostsee/wasserstand_ostsee_node.html";

// // GET handler for the API route
// export async function GET() {
//   console.log("Starting browser...");
//   const browser = await puppeteer.launch({ headless: true });
//   const page = await browser.newPage();

//   try {
//     console.log("Navigating to BSH website...");
//     await page.goto(BSH_URL, { waitUntil: "networkidle0" });

//     // Get the HTML content
//     const html = await page.content();

//     console.log("HTML scraped successfully!", html);
//     return new NextResponse(html, {
//       headers: {
//         "Content-Type": "text/html",
//       },
//     });
//   } catch (error) {
//     console.error("Error during scraping:", error);
//     return NextResponse.json(
//       { error: "Failed to fetch page" },
//       { status: 500 },
//     );
//   } finally {
//     await browser.close();
//     console.log("Browser closed.");
//   }
// }

export async function POST() {
  try {
    const waterLevels = await scrapeWebsite();
    const parsedData = parseData(waterLevels);

    // First create/get all locations
    const locations = await Promise.all(
      parsedData.data.map((data) =>
        db.locations.upsert({
          where: { name: data.location.toLowerCase() },
          create: {
            name: data.location.toLowerCase(),
            display_name: data.location,
          },
          update: {},
        }),
      ),
    );

    // Then create predictions with location_id
    await db.predictions.createMany({
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

    return Response.json({ success: true });
  } catch (error) {
    console.error("Scrape failed:", error);
    return Response.json({ error: "Failed to scrape data" }, { status: 500 });
  }
}

function getNumbers(aString: string | undefined) {
  if (!aString) {
    throw new Error("No string found");
  }
  const matches = /([+-]\d+)([+-]\d+)/.exec(aString);
  const firstNumber = matches?.[1] ? parseInt(matches[1]) : null; // e.g., +35
  const secondNumber = matches?.[2] ? parseInt(matches[2]) : null; // e.g., -5 or +10

  if (isNil(firstNumber) || isNil(secondNumber)) {
    debugger;
    throw new Error(`No numbers found in string: "${aString}"`);
  }

  return { max: firstNumber, min: secondNumber };
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

    // Use getNumbers function to extract numbers
    const { min: secondNumber, max: firstNumber } = getNumbers(
      aWaterLevels.data[2][index],
    );

    if (!aWaterLevels.data[1]?.[0]) {
      throw new Error("No time found");
    }

    if (isNil(firstNumber) || isNil(secondNumber)) {
      throw new Error("No numbers found in the first row");
    }

    result.data.push({
      location: locationString,
      time: aWaterLevels.data[1][0],
      min: secondNumber,
      max: firstNumber,
    });

    const numbersString = aWaterLevels.data[4]?.[index];
    if (isNil(numbersString)) {
      throw new Error(
        "The string that should be for numbers is undefined or null",
      );
    }

    let { min, max } = getNumbers(numbersString);

    if (!aWaterLevels.data[3]?.[0]) {
      throw new Error("No time found");
    }

    result.data.push({
      location: locationString,
      time: aWaterLevels.data[3][0],
      min: min,
      max: max,
    });

    ({ min, max } = getNumbers(aWaterLevels.data[6]?.[index]));

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
