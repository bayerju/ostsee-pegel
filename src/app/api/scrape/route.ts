import { NextResponse } from 'next/server';
import puppeteer from 'puppeteer';

const BSH_URL = 'https://www.bsh.de/DE/DATEN/Vorhersagen/Wasserstand_Ostsee/wasserstand_ostsee_node.html';

// GET handler for the API route
export async function GET() {
  console.log('Starting browser...');
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  try {
    console.log('Navigating to BSH website...');
    await page.goto(BSH_URL, { waitUntil: 'networkidle0' });

    // Get the HTML content
    const html = await page.content();

    console.log('HTML scraped successfully!', html);
    return new NextResponse(html, {
      headers: {
        'Content-Type': 'text/html',
      },
    });

  } catch (error) {
    console.error('Error during scraping:', error);
    return NextResponse.json(
      { error: 'Failed to fetch page' },
      { status: 500 }
    );
  } finally {
    await browser.close();
    console.log('Browser closed.');
  }
}

