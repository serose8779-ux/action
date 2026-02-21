import { NextResponse } from 'next/server';

/**
 * NextJS 16 App Router API Route
 * Client에서 받은 데이터를 GAS(Google Apps Script)로 전달하는 프록시 역할을 합니다.
 * 이를 통해 브라우저에서 직접 GAS URL을 노출하지 않고 안전하게 통신합니다.
 */
export async function POST(request: Request) {
  try {
    const { text } = await request.json();
    const gasUrl = process.env.GAS_URL;
    const authKey = process.env.AUTH_KEY;

    if (!gasUrl || !authKey) {
      return NextResponse.json(
        { success: false, message: '환경 변수(GAS_URL 또는 AUTH_KEY)가 설정되지 않았습니다.' },
        { status: 500 }
      );
    }

    // GAS로 데이터 전송
    const response = await fetch(gasUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text: text,
        authKey: authKey,
      }),
    });

    if (!response.ok) {
      throw new Error(`GAS request failed with status ${response.status}`);
    }

    const result = await response.json();

    return NextResponse.json(result);

  } catch (error: any) {
    console.error('API Route Error:', error);
    return NextResponse.json(
      { success: false, message: error.message || '서버 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}
