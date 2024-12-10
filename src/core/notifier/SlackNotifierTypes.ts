export interface NotifyArg {
    targetUserName: string;
    imageUrls: string[];
}

export interface SlackMessagePayload {
    text: string;
    attachments: Array<{ color: string; text: string; image_url: string }>;
}
