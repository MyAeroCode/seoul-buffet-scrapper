import { GeminiAnalyzer } from '../analyzer/GeminiAnalyzer';
import { SlackNotifier } from '../notifier/SlackNotifier';
import { InstagramScrapper } from './InstagramScrapper';

export interface InstagramScrapperExecuterSource {
    targetUserName: string;
    imageScrapCount: number;
    alias: string;
}

export abstract class InstagramScrapperExecuter {
    protected readonly targetUserName: string;
    protected readonly imageScrapCount: number;
    protected readonly alias: string;

    constructor(source: InstagramScrapperExecuterSource) {
        this.targetUserName = source.targetUserName;
        this.imageScrapCount = source.imageScrapCount;
        this.alias = source.alias;
    }

    async execute(): Promise<void> {
        const imageUrls = await this.getRecentImages();

        const menuText = await GeminiAnalyzer.analyze(imageUrls);

        await SlackNotifier.notify({
            buffetAlias: this.alias,
            body: menuText,
            imageUrls,
        });
    }

    private async getRecentImages(): Promise<string[]> {
        const recentImages = await InstagramScrapper.getRecentImages({
            username: this.targetUserName,
            imageScrapCount: this.imageScrapCount,
        });

        return recentImages;
    }
}
