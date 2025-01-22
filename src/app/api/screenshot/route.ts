// pages/api/screenshot.js
import { NextRequest, NextResponse } from 'next/server';
import puppeteer from 'puppeteer';

export async function POST(request: NextRequest) {
  try {
    // Parse the JSON body
    const body = await request.json();
    const { url } = body;

    if (!url) {
      return NextResponse.json(
        { error: 'URL is required' },
        { status: 400 }
      );
    }

    // Launch browser
    const browser = await puppeteer.launch({
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    // Create new page
    const page = await browser.newPage();
    
    // Set viewport size
    await page.setViewport({
      width: 1920,
      height: 1080
    });

    // Navigate to URL
    await page.goto(url, {
      waitUntil: 'networkidle0',
      timeout: 30000
    });

    // Take screenshot
    const screenshot = await page.screenshot({
      type: 'png',
      fullPage: false
    });
    // Close browser
    await browser.close();

    // Return screenshot as response
    return new NextResponse(screenshot, {
      headers: {
        'Content-Type': 'image/png',
      },
    });
    
  } catch (error) {
    console.error('Screenshot error:', error);
    return NextResponse.json(
      { error: 'Failed to capture screenshot' },
      { status: 500 }
    );
  }
}