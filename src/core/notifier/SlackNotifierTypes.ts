export interface NotifyArg {
    buffetAlias: string;
    body: string;
    imageUrls: string[];
}

export interface SlackMessagePayload {
    text: string;
    attachments: Array<{ color: string; text: string; image_url: string }>;
}
