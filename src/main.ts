import { LifeBeerBuffet } from './buffets/LifeBeerBuffet';
import { InstagramScrapperExecuter } from './core/scrapper/InstagramScrapperExecuter';

async function main() {
    const targetBuffets: InstagramScrapperExecuter[] = [new LifeBeerBuffet()];

    for (const targetBuffet of targetBuffets) {
        await targetBuffet.execute();
    }
}

main();
