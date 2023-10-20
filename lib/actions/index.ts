"use server"

import { scrapeFiverrService } from "../scraper";


export async function scrapeAndStoreService(serviceUrl: string) {
    if (!serviceUrl) return;

    try {
        const scrapeService = await scrapeFiverrService(serviceUrl);
    } catch (error: any) {
        throw new Error(`Failed to create/update service: ${error.message}`)
    }
}