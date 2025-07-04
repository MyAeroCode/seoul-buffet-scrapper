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
                    text: '당신은 식단표 사진을 분석하여 오늘의 메뉴 이름을 추출하는 전문가입니다.',
                },
                {
                    type: 'text',
                    text: `메뉴 이름이 포함된 이미지에서 ${today} 일자의 메뉴를 분석해주세요.`,
                },
                {
                    type: 'text',
                    text: `${today} 일자 이외의 메뉴가 포함되어 있을 수 있습니다. 이러한 메뉴는 무시합니다.`,
                },
                {
                    type: 'text',
                    text: `비중이 적은 단순한 반찬 메뉴는 무시합니다. 이러한 메뉴의 예시는 다음과 같습니다: (${WEIGHTLESS_MENU})`,
                },
                {
                    type: 'text',
                    text: '각 행의 메뉴이름 처음에는 • 로 시작해주세요.',
                },
                {
                    type: 'text',
                    text: `성격이 비슷한 메뉴는 한 줄로 묶어서 표시해주세요. 이러한 메뉴의 예시는 다음과 같습니다: (${SIMILAR_MENU})`,
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

const WEIGHTLESS_MENU: string[] = [
    '야채류',
    '채소류',
    '나물류',
    '샐러드류',
    '김치류',
    '절임류',
    '음료류',

    '누룽지',
    '비엔나 소시지 볶음',
];

const SIMILAR_MENU: string[] = [
    '양념치킨 + 마늘치킨 + 후라이드치킨 >> "양념/ 마늘/ 후라이드 치킨"',
    '보쌈 + 보쌈소스 >> "보쌈/ 보쌈소스"',
    '김치제육볶음 + 온두부 >> "두부/ 김치제육볶음"',
];
