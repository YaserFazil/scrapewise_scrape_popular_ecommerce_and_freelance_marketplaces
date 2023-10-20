import axios from "axios";
import * as cheerio from 'cheerio';
import { extractPrice, stockStatus } from "../utils";


export async function scrapeFiverrService(url: string) {
    if (!url) return;


    // curl --proxy brd.superproxy.io:22225 --proxy-user brd-customer-hl_7e50ab60-zone-unblocker:cr75fkhi3i5x -k https://lumtest.com/myip.json


    // BrightData proxy configuration
    const username = String(process.env.BRIGHT_DATA_USERNAME);
    const password = String(process.env.BRIGHT_DATA_PASSWORD);
    const port = 22225;
    const session_id = (1000000 * Math.random()) | 0;
    const customUserAgent = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/118.0.0.0 Safari/537.36"; // Set your desired User-Agent here
    const options = {
        auth: {
            username: `${username}-session-${session_id}`,
            password,
        },
        host: 'brd.superproxy.io',
        port,
        rejectUnauthorized: false,
        headers: {
            'User-Agent': customUserAgent, // Set the User-Agent header
        },
    }

    try {
        // Fetch the service page
        const response = await axios.get(url, options);
        const $ = cheerio.load(response.data);
        // Extract product / service title  
        const title = $('#productTitle').text().trim();
        const trendyolTitle = $('h1.pr-new-br').text().trim();
        // Extract and format the current price
        const currentPrice = extractPrice(
            $('span.a-price.a-text-price.a-size-medium.apexPriceToPay span.a-offscreen')
        );

        const trendyolCurrentPrice = $('div.pr-bx-w div.pr-bx-nm.with-org-prc span.prc-dsc').text().trim();

        console.log("Current Price:", currentPrice);
        // const outOfStock = $('.a-size-medium.a-color-success').text().trim().toLowerCase() === 'currently unavailable.';
        const outOfStockStatus = $('.a-size-medium.a-color-success').text().trim().toLowerCase();
        const outOfStock = stockStatus(outOfStockStatus);




        console.log({ title, currentPrice, outOfStock })
        console.log({ trendyolTitle, trendyolCurrentPrice })
    } catch (error: any) {
        throw new Error(`Failed to scrape service: ${error.message}`)
    }
}


