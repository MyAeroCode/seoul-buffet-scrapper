import { InstagramScrapperExecuter } from '../core/scrapper/InstagramScrapperExecuter';

export class OmiraKitchenBuffet extends InstagramScrapperExecuter {
    constructor() {
        super({
            targetUserName: 'omirakitchen',
            imageScrapCount: 1,
            alias: '오미라식당',
        });
    }
}
