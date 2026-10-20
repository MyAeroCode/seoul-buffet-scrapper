import { ApifyClient } from 'apify-client';

import { ApifyConfig } from '../../config/ApifyConfig';

interface InstagramPost {
    type: string;
    timestamp: string;
    displayUrl: string;
}

export class InstagramScrapper {
    private static readonly MAX_ATTEMPTS = 3;

    static async getRecentImages(params: {
        username: string;
        imageScrapCount: number;
    }): Promise<string[]> {
        const { username, imageScrapCount } = params;

        const client = new ApifyClient({ token: ApifyConfig.apiToken });

        for (let attempt = 1; attempt <= this.MAX_ATTEMPTS; attempt++) {
            const latestPosts = await this.getLatestPosts(client, username, attempt);

            if (latestPosts.length > 0) {
                const recentPosts = latestPosts
                    .sort((a, b) => b.timestamp.localeCompare(a.timestamp))
                    .slice(0, imageScrapCount);

                const imagePosts = recentPosts.filter((post) => post.type === 'Image');

                return imagePosts.map((post) => post.displayUrl);
            }
        }

        return [];
    }

    private static async getLatestPosts(
        client: ApifyClient,
        username: string,
        attempt: number,
    ): Promise<InstagramPost[]> {
        const input = {
            usernames: [username],
        };

        const instagramProfileScrapperActorId = 'apify/instagram-profile-scraper';
        const run = await client.actor(instagramProfileScrapperActorId).call(input);

        const { items } = await client.dataset(run.defaultDatasetId).listItems();

        console.log(
            `[apify] ${username} attempt=${attempt} run=${run.status} items=${items.length}`,
        );
        for (const item of items.filter((item) => item.error)) {
            console.log(`[apify] ${username} error=${item.error} (${item.errorDescription})`);
        }

        return items.flatMap((item) => (item.latestPosts ?? []) as InstagramPost[]);
    }
}
