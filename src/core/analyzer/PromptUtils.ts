import dayjs from 'dayjs';

import { CoreMessage } from 'ai';

export function generateTodayPrompt(imageUrls: string[]): CoreMessage[] {
    const today: string = dayjs().format('YYYY-MM-DD (ddd)');

    return [
        {
            role: 'user',
            content: [
                {
                    type: 'text',
                    text: '당신은 메뉴 이름이 포함된 이미지 분석가입니다.',
                },
                {
                    type: 'text',
                    text: `${today} 일자 이외의 메뉴가 포함되어 있을 수 있습니다.`,
                },
                {
                    type: 'text',
                    text: `메뉴 이름이 포함된 이미지에서 ${today} 일자의 메뉴를 분석해주세요.`,
                },
                {
                    type: 'text',
                    text: `${today} 일자 외의 메뉴는 표시하지 않습니다.`,
                },
                {
                    type: 'text',
                    text: '각 행의 메뉴이름 처음에는 • 로 시작해주세요.',
                },
                {
                    type: 'text',
                    text: '항상 한국어로 대답하고, 메뉴 이름만 반환해주세요. 메뉴 이름 이외의 응답은 하지 마세요.',
                },
                ...(imageUrls.map((imageUrl) => ({
                    type: 'image',
                    image: new URL(imageUrl),
                })) as any),
            ],
        },
    ];
}
