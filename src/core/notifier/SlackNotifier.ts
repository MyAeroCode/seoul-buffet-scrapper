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

        console.log(JSON.stringify(payload, null, 4));
    }
}
