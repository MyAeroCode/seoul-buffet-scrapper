import { InstagramScrapperExecuter } from '../core/scrapper/InstagramScrapperExecuter';

export class LifeBeerBuffet extends InstagramScrapperExecuter {
    constructor() {
        super({
            targetUserName: 'brs_buffet',
            imageScrapCount: 2,
        });
    }
}
