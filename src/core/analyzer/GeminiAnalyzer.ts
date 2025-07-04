import { google } from '@ai-sdk/google';
import { generateText } from 'ai';
import { generateTodayPrompt } from './PromptUtils';

export class GeminiAnalyzer {
    static async analyze(imageUrls: string[]): Promise<string> {
        try {
            const result = await generateText({
                model: google('gemini-2.5-pro'),
                messages: generateTodayPrompt(imageUrls),
            });

            return result.text;
        } catch (error) {
            console.error(error);
            return '';
        }
    }
}
