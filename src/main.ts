import { InstagramScrapperExecuter } from './core/scrapper/InstagramScrapperExecuter';

async function main() {
    const targetBuffets: InstagramScrapperExecuter[] = [];

    for (const targetBuffet of targetBuffets) {
        await targetBuffet.execute();
    }
}

main();
