import { InstagramScrapperExecuter } from './core/scrapper/InstagramScrapperExecuter';

import { LifeBeerBuffet } from './buffets/LifeBeerBuffet';
import { OmiraKitchenBuffet } from './buffets/OmiraKitchenBuffet';

async function main() {
    const targetBuffets: InstagramScrapperExecuter[] = [
        new LifeBeerBuffet(),
        new OmiraKitchenBuffet(),
    ];

    for (const targetBuffet of targetBuffets) {
        await targetBuffet.execute();
    }
}

main();
