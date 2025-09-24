'use client';

import React, { useState, ChangeEvent } from 'react';
import RecommendationCard from './components/recommendation/RecommendationCard';
import { Recommendation, ClothingItem } from '../lib/types';

const AnalysisInProgress = () => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8 text-center bg-gray-50 dark:bg-zinc-950">
      <div className="flex flex-col items-center">
        <svg className="animate-spin -ml-1 mr-3 h-10 w-10 text-pink-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <h2 className="text-2xl font-semibold text-pink-500 mt-4">AI 분석 중...</h2>
        <p className="text-gray-600 dark:text-gray-300 mt-2">잠시만 기다려주세요, 당신만을 위한 스타일을 찾고 있어요!</p>
      </div>
    </main>
  );
};

export default function Home() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [recommendation, setRecommendation] = useState<Recommendation | null>(null);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      setMessage('');
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setMessage('이미지를 먼저 선택해주세요.');
      return;
    }

    setIsLoading(true);
    setMessage('');

    // --- 실제 n8n Webhook 연동 로직 ---
    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      // 🚨 주의: 아래 URL은 예시이며, 실제 n8n Webhook URL로 변경해야 합니다.
      const response = await fetch('https://yuyeonghwan.app.n8n.cloud/webhook-test/9e61dbab-0082-47ad-9a01-94980b2d9a6f', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();

        // API 응답은 추천 아이템 배열을 포함할 수 있으므로, 이를 파싱하여 Recommendation 객체 형태로 변환합니다.
        const recommendedItems: ClothingItem[] = data.recommendations || [];
        const itemsByType = recommendedItems.reduce((acc, item) => {
            if (item.type) {
                acc[item.type] = item;
            }
            return acc;
        }, {} as { [key: string]: ClothingItem });
        
        const newRecommendation: Recommendation = {
            weather: data.weather || '정보 없음',
            temperature: data.temperature || '정보 없음',
            items: {
                top: itemsByType.top,
                bottom: itemsByType.bottom,
                outerwear: itemsByType.outerwear,
                shoes: itemsByType.shoes,
            }
        };
        setRecommendation(newRecommendation);
      } else {
        const errorData = await response.json();
        setMessage(`업로드 실패: ${errorData.message || '알 수 없는 오류'}`);
        setRecommendation(null); // 실패 시 추천 데이터 초기화
      }
    } catch (error) {
      console.error('Upload error:', error);
      setMessage('업로드 중 오류가 발생했습니다.');
      setRecommendation(null); // 오류 발생 시 추천 데이터 초기화
    } finally {
      setIsLoading(false);
    }
  };

  const reset = () => {
    setSelectedFile(null);
    setPreview(null);
    setIsLoading(false);
    setMessage('');
    setRecommendation(null);
  };

  if (isLoading) {
    return <AnalysisInProgress />;
  }

  if (recommendation) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center p-8 bg-gray-50 dark:bg-zinc-950">
        <RecommendationCard {...recommendation} />
        <button
          onClick={reset}
          className="mt-8 px-6 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          다른 이미지로 분석하기
        </button>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8 text-center bg-gray-50 dark:bg-zinc-950">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        
      </div>

      <div className="relative z-[-1] flex flex-col items-center place-items-center mb-8">
        <h1 className="text-5xl font-bold text-pink-500 mb-4">
          AI.Styler ✨
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">당신만을 위한 AI 스타일링</p>
      </div>

      <div className="w-full max-w-md mx-auto bg-white dark:bg-zinc-900 rounded-xl shadow-md overflow-hidden md:max-w-2xl mt-8">
        <div className="p-8">
          <p className="mt-2 text-slate-500 dark:text-slate-400">자신의 사진이나 원하는 스타일의 이미지를 업로드하여 AI의 맞춤 스타일 추천을 받아보세요.</p>
          
          <div className="mt-4">
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 dark:border-gray-600 border-dashed rounded-md">
              <div className="space-y-1 text-center">
                <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                  <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <div className="flex text-sm text-gray-600 dark:text-gray-400">
                  <label htmlFor="file-upload" className="relative cursor-pointer bg-white dark:bg-zinc-800 rounded-md font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                    <span>파일 업로드</span>
                    <input id="file-upload" name="file-upload" type="file" className="sr-only" accept="image/*" onChange={handleImageChange} />
                  </label>
                  <p className="pl-1">또는 드래그 앤 드롭</p>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  PNG, JPG, GIF up to 10MB
                </p>
              </div>
            </div>
          </div>

          {preview && (
            <div className="mt-4">
              <p className="text-sm font-medium text-gray-900 dark:text-white">미리보기:</p>
              <img src={preview} alt="Image preview" className="mt-2 rounded-md max-h-60 w-auto mx-auto"/>
            </div>
          )}

          <div className="mt-6">
            <button
              onClick={handleUpload}
              disabled={isLoading || !selectedFile}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {isLoading ? '업로드 중...' : '스타일 분석 요청'}
            </button>
          </div>

          {message && (
            <p className={`mt-4 text-sm text-center ${message.includes('성공') ? 'text-green-600' : 'text-red-600'}`}>
              {message}
            </p>
          )}
        </div>
      </div>
    </main>
  );
}
