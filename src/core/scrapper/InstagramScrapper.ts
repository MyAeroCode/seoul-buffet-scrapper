import { ApifyClient } from 'apify-client';

import { ApifyConfig } from '../../config/ApifyConfig';

export class InstagramScrapper {
    static async getRecentImages(username: string): Promise<string[]> {
        const client = new ApifyClient({
            token: ApifyConfig.apiToken,
        });

        const input = {
            addParentData: false,
            directUrls: [`https://www.instagram.com/${username}/`],
            enhanceUserSearchWithFacebookPage: false,
            isUserReelFeedURL: false,
            isUserTaggedFeedURL: false,
            onlyPostsNewerThan: '1 day',
            resultsLimit: 5,
            resultsType: 'posts',
            searchLimit: 1,
            searchType: 'hashtag',
        };

        const instagramScrapperActorId = 'shu8hvrXbJbY3Eb9W';
        const run = await client.actor(instagramScrapperActorId).call(input);

        const { items } = await client.dataset(run.defaultDatasetId).listItems();

        const imageItems = items.filter((items) => items.type === 'Image');

        return imageItems.map((item) => item.displayUrl as string);
    }
}
