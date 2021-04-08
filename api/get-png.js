import * as playwright from 'playwright-aws-lambda';
import FormData from "form-data";
import fetch from 'node-fetch'

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        res.status(405).end("405 Method Not Allowed");
        return;
    }

    const browser = await playwright.launchChromium({headless: true});
    const context = await browser.newContext({
        deviceScaleFactor: 2
    });
    const page = await context.newPage();
    await page.setContent(`
<!DOCTYPE html>
${req.body}
<style>
    .main {
        resize: none !important;
        border: none !important;
    }
</style>
    `)
    console.log("Set page content")
    const element = await page.$('.honeycomb')

    // If element is not found, fallback to a full-page screenshot
    const imageWithSpace = await (element || page).screenshot({
        type: "png",
        omitBackground: true
    })
    console.log("Took screenshot")
    await browser.close()
    console.log("Closed browser")

    const fd = new FormData()
    fd.append("image", imageWithSpace, {contentType: 'image/png', filename: 'screenshot.png'})

    const data = await fetch(process.env.TRIM_API_URL, {
        method: 'POST',
        body: fd
    })
    .then(function (trimResponse) {
        return trimResponse.buffer();
    })

    res.setHeader("Cache-Control", "s-maxage=31536000, stale-while-revalidate")
    res.setHeader('Content-Type', 'image/png')

    res.end(data)
}
