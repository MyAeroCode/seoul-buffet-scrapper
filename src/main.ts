import dotenv from 'dotenv';
dotenv.config({ path: `${__dirname}/env/.env` });

import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import 'dayjs/locale/ko';

import { InstagramScrapperExecuter } from './core/scrapper/InstagramScrapperExecuter';

import { LifeBeerBuffet } from './buffets/LifeBeerBuffet';
import { OmiraKitchenBuffet } from './buffets/OmiraKitchenBuffet';

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.locale('ko');

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
