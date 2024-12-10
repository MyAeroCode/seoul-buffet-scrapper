import axios from 'axios';
import dayjs from 'dayjs';

import { SlackNotifierConfig } from '../../config/SlackNotifierConfig';
import { NotifyArg, SlackMessagePayload } from './SlackNotifierTypes';

export class SlackNotifier {
    static async notify(arg: NotifyArg) {
        const payload: SlackMessagePayload = {
            text: `*[${this.getCurrentDate()} - ${arg.buffetAlias}]* 한식뷔페 파티 찾아요! 🤤`,
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

    private static getCurrentDate(): string {
        return dayjs().startOf('day').format('YYYY-MM-DD (ddd)');
    }
}
