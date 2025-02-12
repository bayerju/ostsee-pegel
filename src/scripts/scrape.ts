import * as cheerio from "cheerio";
import fs from "fs";
import { fileURLToPath } from "url";
import { dirname } from "path";

const BSH_URL = "https://www2.bsh.de/aktdat/wvd/ostsee/Ostsee.html";

interface WaterLevelRange {
  min: number;
  max: number;
}

interface WaterLevelData {
  timestamp: string;
  lastUpdated: string;
  regions: {
    kielerBucht: WaterLevelRange;
    luebeckerBucht: WaterLevelRange;
    westlichRuegens: WaterLevelRange;
    oestlichRuegens: WaterLevelRange;
    kleinesHaff: WaterLevelRange;
  };
}

function filterIndexesInPlace(array: string[], indexesToKeep: number[]): void {
  const keepSet = new Set(indexesToKeep);

  for (let i = array.length - 1; i >= 0; i--) {
    if (!keepSet.has(i)) {
      array.splice(i, 1);
    }
  }
}

export interface ScrapedData {
  lastUpdated: string;
  data: string[][];
}

export async function scrapeWebsite(): Promise<ScrapedData> {
  const response = await fetch(BSH_URL);

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const html = await response.text();
  const $ = cheerio.load(html) as cheerio.CheerioAPI;

  const tableData: string[][] = [];

  $("table tbody tr").each((_, row) => {
    const rowData: string[] = [];
    $(row)
      .find("th, td")
      .each((_, cell) => {
        const text = $(cell).text().trim();
        rowData.push(text);
      });

    if (rowData.length === 2) return;
    if (rowData.length > 5) {
      filterIndexesInPlace(rowData, [0, 3, 6, 9, 12]);
    }
    tableData.push(rowData);
  });

  const lastUpdated = $("table caption small")
    .text()
    .replace("Vorhersage erstellt am", "")
    .trim();

  return { lastUpdated, data: tableData };
}

// Run the script
// scrapeWebsite();
