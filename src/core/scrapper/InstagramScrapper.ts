import puppeteer from 'puppeteer-extra';
import stealthPlugin from 'puppeteer-extra-plugin-stealth';

puppeteer.use(stealthPlugin());

export class InstagramScrapper {
    static async getRecentImages(username: string): Promise<string[]> {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto(`https://www.instagram.com/${username}/`);

        await new Promise((resolve) => setTimeout(resolve, 5000));

        const images = await page.evaluate(function () {
            return Array.from(document.getElementsByTagName('img'))
                .map((img) => ({
                    src: img.src,
                    alt: img.alt,
                }))
                .filter((img) => img.alt.startsWith('Photo by'));
        });

        await browser.close();

        return images.map((img) => img.src);
    }
}
