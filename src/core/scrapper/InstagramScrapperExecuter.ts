import { InstagramScrapper } from './InstagramScrapper';

export interface InstagramScrapperExecuterSource {
    targetUserName: string;
    imageScrapCount: number;
}

export abstract class InstagramScrapperExecuter {
    protected readonly targetUserName: string;
    protected readonly imageScrapCount: number;

    constructor(source: InstagramScrapperExecuterSource) {
        this.targetUserName = source.targetUserName;
        this.imageScrapCount = source.imageScrapCount;
    }

    async execute(): Promise<void> {
        //
    }

    private async getRecentImages(): Promise<string[]> {
        const recentImages = await InstagramScrapper.getRecentImages(this.targetUserName);
        return recentImages.slice(0, this.imageScrapCount);
    }
}
