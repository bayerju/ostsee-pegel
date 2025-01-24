import puppeteer from 'puppeteer';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const BSH_URL = 'https://www.bsh.de/DE/DATEN/Vorhersagen/Wasserstand_Ostsee/wasserstand_ostsee_node.html';

async function scrapeWebsite() {
  console.log('Starting browser...');
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  try {
    console.log('Navigating to BSH website...');
    await page.goto(BSH_URL, { waitUntil: 'networkidle0' });

    // Get the HTML content
    const html = await page.content();

    // Get current script directory
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);
    
    // Save to file in same directory as script
    fs.writeFileSync(`${__dirname}/scraped.html`, html);
    console.log('HTML saved to scraped.html');

    // Also log to console
    console.log('Scraped HTML:', html);

  } catch (error) {
    console.error('Error during scraping:', error);
  } finally {
    await browser.close();
    console.log('Browser closed.');
  }
}

// Run the script
scrapeWebsite();