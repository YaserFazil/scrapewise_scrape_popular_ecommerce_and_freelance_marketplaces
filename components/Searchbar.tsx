"use client"

import { scrapeAndStoreService } from "@/lib/actions";
import { scrapeFiverrService } from "@/lib/scraper";
import { FormEvent, useState } from "react"

const isValidFiverrServiceURL = (url: string) => {
    try {
        const parseURL = new URL(url);
        const hostname = parseURL.hostname;

        // Check if hostname contains fiverr.com or fiverr.
        if (
            hostname.includes('upwork.com') ||
            hostname.includes('upwork.com') ||
            hostname.includes('fiverr.com') ||
            hostname.includes('amazon.com.tr') ||
            hostname.includes('amazon.com') ||
            hostname.includes('amazon.ae') ||
            hostname.includes('trendyol.com') ||
            hostname.endsWith('.com')
        ) {
            return true;
        }
    } catch (error) {
        return false;
    }
    return false;
}

const Searchbar = () => {
    const [searchPrompt, setSearchPrompt] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const isValidLink = isValidFiverrServiceURL(searchPrompt);
        if (!isValidLink) return alert("Please provide a valid Fiverr link!")

        try {
            setIsLoading(true);
            // Scrape the service page
            const service = await scrapeAndStoreService(searchPrompt);
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }


    return (
        <form
            className="flex flex-wrap gap-4 mt-12"
            onSubmit={handleSubmit}
        >
            <input
                className="searchbar-input"
                type="text"
                value={searchPrompt}
                onChange={(e) => setSearchPrompt(e.target.value)}
                placeholder="Enter service link"

            />
            <button
                type="submit"
                className="searchbar-btn"
                disabled={searchPrompt === ''}
            >
                {isLoading ? 'Searching...' : 'Search'}
            </button>
        </form>
    )
}

export default Searchbar