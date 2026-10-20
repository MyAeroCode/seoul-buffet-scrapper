import { google } from '@ai-sdk/google';
import { generateText } from 'ai';
import { generateTodayPrompt } from './PromptUtils';

export class GeminiAnalyzer {
    static async analyze(imageUrls: string[]): Promise<string> {
        try {
            const result = await generateText({
                model: google('gemini-3.8-flash'),
                messages: generateTodayPrompt(imageUrls),
            });

            console.log(`[gemini] finishReason=${result.finishReason}\n${result.text}`);

            return result.text;
        } catch (error) {
            console.error(error);
            return '';
        }
    }
}
