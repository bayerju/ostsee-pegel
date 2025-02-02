import puppeteer from 'puppeteer';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const BSH_URL = 'https://www2.bsh.de/aktdat/wvd/ostsee/Ostsee.html';

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
  // Create a Set for fast lookup of indexes to keep
  const keepSet = new Set(indexesToKeep);

  // Traverse the array in reverse to avoid index-shifting issues
  for (let i = array.length - 1; i >= 0; i--) {
    if (!keepSet.has(i)) {
      array.splice(i, 1); // Remove the element if the index is not in the keepSet
    }
  }
}

export interface ScrapedData {
  lastUpdated: string;
  data: string[][];
}

export async function scrapeWebsite(): Promise<ScrapedData> {
  const browser = await puppeteer.launch({ 
    executablePath: '/usr/bin/chromium-browser',
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });
  const page = await browser.newPage();

  try {
    await page.goto(BSH_URL, { waitUntil: 'networkidle0' });
    const table = await page.$('table');
    if (!table) throw new Error('Table not found');

    const rows = await table.$$('tbody tr');
    const tableData: string[][] = [];

    for (const row of rows) {
        const cells = await row.$$('th, td');
        const rowData: string[] = [];

        for (const cell of cells) {
            const textContent = await cell.evaluate(el => el.textContent?.trim() ?? '');
            rowData.push(textContent);
        }

        if (rowData.length === 2) continue;
        if (rowData.length > 5) {
            filterIndexesInPlace(rowData, [0, 3, 6, 9, 12]);
        }
        tableData.push(rowData);
    }

    const lastUpdated = await page.evaluate(() => {
      const caption = document.querySelector('table caption small')?.textContent;
      return caption?.replace('Vorhersage erstellt am', '').trim() ?? '';
    });

    return { lastUpdated, data: tableData };
  } finally {
    await browser.close();
  }
}

// Run the script
// scrapeWebsite();