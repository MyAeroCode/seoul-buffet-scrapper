import axios from 'axios';

import { SlackNotifierConfig } from '../../config/SlackNotifierConfig';
import { NotifyArg, SlackMessagePayload } from './SlackNotifierTypes';

export class SlackNotifier {
    static async notify(arg: NotifyArg) {
        const payload: SlackMessagePayload = {
            text: arg.targetUserName,
            attachments: [],
        };

        for (const imageUrl of arg.imageUrls) {
            payload.attachments.push({
                color: '#36a64f',
                text: 'image',
                image_url: imageUrl,
            });
        }

        axios.post(SlackNotifierConfig.slackWebhookUrl, payload);
    }
}
