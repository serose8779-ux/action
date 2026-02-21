/**
 * 클라이언트 측에서 사용되는 행동 기록 서비스
 */
export const actionService = {
    /**
     * 입력된 텍스트를 분석 요청합니다.
     * Internal API Route (/api/actions)를 호출합니다.
     */
    async recordAction(text: string) {
        const response = await fetch('/api/actions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ text }),
        });

        const data = await response.json();

        if (!response.ok || !data.success) {
            throw new Error(data.message || '데이터 전송 중 오류가 발생했습니다.');
        }

        return data.data; // 분석된 결과 배열 반환
    },
};
