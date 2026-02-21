'use client';

import React, { useState } from 'react';
import { actionService } from './services/action-service';

/**
 * AI 학생 행동 기록 시스템 - 메인 UI
 * NextJS 16 App Router 사용
 */
export default function ActionLogPage() {
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<any[]>([]);
  const [statusMessage, setStatusMessage] = useState('');

  // 제출 핸들러
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    setIsLoading(true);
    setStatusMessage('AI가 행동을 분석하고 시트에 기록 중입니다...');
    setResults([]);

    try {
      const data = await actionService.recordAction(inputText);
      setResults(data);
      setStatusMessage('기록이 성공적으로 완료되었습니다.');
      setInputText(''); // 입력창 초기화
    } catch (error: any) {
      console.error(error);
      setStatusMessage(`오류 발생: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-200 p-6 md:p-12 font-sans">
      <div className="max-w-4xl mx-auto space-y-8">

        {/* 헤더 세션 */}
        <header className="text-center space-y-2">
          <h1 className="text-4xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">
            AI 학생 행동 기록 시스템
          </h1>
          <p className="text-slate-400">학생들의 행동을 자유롭게 입력하면 AI가 분석하여 기록합니다.</p>
        </header>

        {/* 입력 섹션 */}
        <section className="bg-[#1e293b] rounded-2xl p-6 shadow-xl border border-slate-700/50">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="actionInput" className="block text-sm font-medium text-slate-400 mb-2">
                행동 내용 입력
              </label>
              <textarea
                id="actionInput"
                rows={5}
                className="w-full bg-[#0f172a] border border-slate-700 rounded-xl p-4 text-slate-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all resize-none placeholder:text-slate-600"
                placeholder="예: 1번 김철수가 오늘 발표를 아주 잘했습니다. 영희는 친구를 도와주었습니다."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                disabled={isLoading}
              />
            </div>

            <button
              type="submit"
              disabled={isLoading || !inputText.trim()}
              className={`w-full py-4 rounded-xl font-semibold text-lg transition-all duration-200 flex items-center justify-center space-x-2 ${isLoading
                  ? 'bg-slate-700 cursor-not-allowed text-slate-400'
                  : 'bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 active:scale-[0.98] shadow-lg shadow-blue-500/20'
                }`}
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin h-5 w-5 mr-3 text-white" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  <span>처리 중...</span>
                </>
              ) : (
                <>
                  <span>기록하기</span>
                </>
              )}
            </button>
          </form>
        </section>

        {/* 상태 및 결과 섹션 */}
        {(statusMessage || results.length > 0) && (
          <section className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className={`p-4 rounded-lg text-sm font-medium border ${statusMessage.includes('오류')
                ? 'bg-red-500/10 border-red-500/20 text-red-400'
                : 'bg-blue-500/10 border-blue-500/20 text-blue-400'
              }`}>
              {statusMessage}
            </div>

            {results.length > 0 && (
              <div className="bg-[#1e293b] rounded-2xl overflow-hidden border border-slate-700/50 shadow-xl">
                <table className="w-full text-left border-collapse">
                  <thead className="bg-slate-800/50 text-slate-400 text-xs uppercase tracking-wider">
                    <tr>
                      <th className="px-6 py-4 font-semibold">번호</th>
                      <th className="px-6 py-4 font-semibold">이름</th>
                      <th className="px-6 py-4 font-semibold">분석된 행동</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-700/50">
                    {results.map((item, index) => (
                      <tr key={index} className="hover:bg-slate-800/30 transition-colors">
                        <td className="px-6 py-4 text-sm text-slate-400">{item.번호}</td>
                        <td className="px-6 py-4 text-sm font-medium text-slate-200">{item.이름}</td>
                        <td className="px-6 py-4 text-sm text-slate-300">{item.행동}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </section>
        )}
      </div>
    </div>
  );
}
