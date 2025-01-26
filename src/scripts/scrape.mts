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

async function scrapeWebsite() {
  console.log('Starting browser...');
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  try {
    console.log('Navigating to BSH website...');
    await page.goto(BSH_URL, { waitUntil: 'networkidle0' });

    // Check if table exists
    const table = await page.$('table');
    console.log('Table found:', !!table);
    if (!table) {
        console.log('Table not found!');
        await browser.close();
        return;
    }
    const rows = await table.$$('tbody tr');
    console.log('Rows found:', rows.length);

    const tableData: string[][] = [];

    for (const row of rows) {
        // Get all direct children cells (th or td) in the row
        const cells = await row.$$('th, td');
        const rowData: string[]= [];

        for (const cell of cells) {
            // Get the text content of each cell
            const cellTextHandle = await cell.getProperty('textContent');
            const cellText = await cellTextHandle.jsonValue();
            rowData.push(cellText?.trim() || '');
        }

        tableData.push(rowData);
    }

    // Get timestamp first
    const lastUpdated = await page.evaluate(() => {
      const caption = document.querySelector('table caption small')?.textContent;
      return caption?.replace('Vorhersage erstellt am', '').trim() || '';
    });
    console.log('Last Updated:', lastUpdated);

    // Get time period rows
    const timeRows = await page.evaluate(() => {
      const rows = Array.from(document.querySelectorAll('tr[style*="border-top-style: double"]'));
      console.log('Found time rows:', rows.length); // This logs in browser context
      return rows.map(row => row.textContent?.trim());
    });
    console.log('Time Periods:', timeRows);

    // Now get the data rows
    const data = await page.evaluate(() => {
      const results: any[] = [];
      
      // Get all double-bordered rows (time period headers)
      const timeRows = Array.from(document.querySelectorAll('tr[style*="border-top-style: double"]'));
      console.log("timeRows",timeRows);
      timeRows.forEach((timeRow, index) => {
        const timestamp = timeRow.textContent?.trim() || '';
        console.log("timerow",timeRow);
        const dataRow = timeRow.nextElementSibling as HTMLTableRowElement;
        
        if (!dataRow) {
          console.log(`No data row found for time period ${index}`);
          return;
        }
        console.log("dataRow",dataRow);

        // Get all td cells that contain the water level data tables
        const cells = Array.from(dataRow.querySelectorAll('td'));
        console.log(`Found ${cells.length} cells for time period ${timestamp}`);
        
        const regionData = cells.map((cell, cellIndex) => {
          const divs = cell.querySelectorAll('div');
          console.log(`Cell ${cellIndex} has ${divs.length} divs`);
          
          if (divs.length !== 2) {
            console.log(`Unexpected number of divs in cell ${cellIndex}`);
            return { min: 0, max: 0 };
          }

          const max = parseInt(divs[0]?.textContent?.trim() || '0');
          const min = parseInt(divs[1]?.textContent?.trim() || '0');
          
          console.log(`Cell ${cellIndex} values:`, { min, max });
          return { min, max };
        });

        if (regionData.length === 5) {
          results.push({
            timestamp,
            regions: {
              kielerBucht: regionData[0],
              luebeckerBucht: regionData[1],
              westlichRuegens: regionData[2],
              oestlichRuegens: regionData[3],
              kleinesHaff: regionData[4]
            }
          });
        } else {
          console.log(`Wrong number of regions: ${regionData.length}`);
        }
      });

      console.log('Final results:', results);
      return results;
    });

    // Add lastUpdated to each entry
    const finalData = data.map(entry => ({
      ...entry,
      lastUpdated
    }));

    // Get current script directory
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);
    
    // Save parsed data to JSON file
    fs.writeFileSync(
      `${__dirname}/water_levels.json`, 
      JSON.stringify(finalData, null, 2)
    );
    console.log('Data saved to water_levels.json');

    // Log the structured data
    console.log('Parsed Data:', finalData);

  } catch (error) {
    console.error('Error during scraping:', error);
  } finally {
    await browser.close();
    console.log('Browser closed.');
  }
}

// Run the script
scrapeWebsite();