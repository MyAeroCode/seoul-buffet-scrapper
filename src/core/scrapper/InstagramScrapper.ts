import { ApifyClient } from 'apify-client';

import { ApifyConfig } from '../../config/ApifyConfig';

interface InstagramPost {
    type: string;
    timestamp: string;
    displayUrl: string;
}

export class InstagramScrapper {
    static async getRecentImages(params: {
        username: string;
        imageScrapCount: number;
    }): Promise<string[]> {
        const { username, imageScrapCount } = params;

        const client = new ApifyClient({ token: ApifyConfig.apiToken });

        const input = {
            usernames: [username],
        };

        const instagramProfileScrapperActorId = 'apify/instagram-profile-scraper';
        const run = await client.actor(instagramProfileScrapperActorId).call(input);

        const { items } = await client.dataset(run.defaultDatasetId).listItems();

        console.log(`[apify] ${username} run=${run.status} items=${items.length}`);
        for (const item of items.filter((item) => item.error)) {
            console.log(`[apify] ${username} error=${item.error} (${item.errorDescription})`);
        }

        const recentPosts = items
            .flatMap((item) => (item.latestPosts ?? []) as InstagramPost[])
            .sort((a, b) => b.timestamp.localeCompare(a.timestamp))
            .slice(0, imageScrapCount);

        const imagePosts = recentPosts.filter((post) => post.type === 'Image');

        return imagePosts.map((post) => post.displayUrl);
    }
}
