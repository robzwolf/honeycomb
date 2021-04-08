import * as playwright from 'playwright-aws-lambda';
import sharp from "sharp";

export default async (req, res) => {
    if (req.method !== 'POST') {
        res.status(405).end("405 Method Not Allowed");
        return;
    }

    const browser = await playwright.launchChromium({ headless: true });
    const context = await browser.newContext({
        deviceScaleFactor: 2
    });
    const page = await context.newPage();
    await page.setContent(`
    ${req.body}
    <style>
        .main {
            resize: none !important;
            border: none !important;
        }
    </style>
    `)
    const element = await page.$('.honeycomb')

    // If element is not found, fallback to a full-page screenshot
    const imageWithSpace = await (element || page).screenshot({
        type: "png",
        omitBackground: true
    })
    await browser.close()

    const imageTrimmed = await sharp(imageWithSpace).trim().toBuffer()

    res.setHeader("Cache-Control", "s-maxage=31536000, stale-while-revalidate")
    res.setHeader('Content-Type', 'image/png')
    res.end(imageTrimmed)
}
