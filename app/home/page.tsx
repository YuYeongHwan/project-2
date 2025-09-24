'use client';

import React, { useState, ChangeEvent } from 'react';

export default function HomePage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');

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
    setMessage('이미지를 업로드하는 중입니다...');

    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      const response = await fetch('https://yuyeonghwan.app.n8n.cloud/webhook/9e61dbab-0082-47ad-9a01-94980b2d9a6f', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        setMessage('이미지 업로드 성공!');
      } else {
        const errorData = await response.json();
        setMessage(`업로드 실패: ${errorData.message || '알 수 없는 오류'}`);
      }
    } catch (error) {
      console.error('Upload error:', error);
      setMessage('업로드 중 오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-50 dark:bg-zinc-950 p-4 sm:p-8">
      <div className="w-full max-w-md mx-auto bg-white dark:bg-zinc-900 rounded-xl shadow-md overflow-hidden md:max-w-2xl mb-8">
        <div className="p-8">
          <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">AI Styler</div>
          <h1 className="block mt-1 text-lg leading-tight font-medium text-black dark:text-white">스타일 추천을 위해 이미지를 업로드하세요</h1>
          <p className="mt-2 text-slate-500 dark:text-slate-400">자신의 사진이나 원하는 스타일의 이미지를 업로드하여 AI의 맞춤 스타일 추천을 받아보세요.</p>
          
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              이미지 파일
            </label>
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
