'use client';

import React from 'react';
import ClothingItem from './ClothingItem';
import { ThumbsUp, ThumbsDown, Bookmark, Share2 } from 'lucide-react';
import { ClothingItem as ClothingItemData } from '../../lib/types';

interface RecommendationCardProps {
  weather: string;
  temperature: string;
  items: {
    top?: ClothingItemData;
    bottom?: ClothingItemData;
    outerwear?: ClothingItemData;
    shoes?: ClothingItemData;
  };
}

export default function RecommendationCard({ weather, temperature, items }: RecommendationCardProps) {
  return (
    <div className="bg-white dark:bg-zinc-900 shadow-2xl rounded-2xl p-6 sm:p-8 w-full max-w-5xl mx-auto transition-shadow duration-300 hover:shadow-xl">
      <div className="flex justify-between items-start mb-6">
        <div className="flex-grow">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">✨ AI 스타일리스트의 추천 ✨</h2>
          <p className="text-gray-600 dark:text-gray-400 mt-2">오늘의 날씨(<span className="font-semibold text-blue-500">{weather}</span>, <span className="font-semibold text-red-500">{temperature}</span>)에 딱 맞는 스타일이에요!</p>
          <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">AI가 제안하는 스타일로 새로운 하루를 시작해보세요. 각 아이템을 클릭하면 구매 페이지로 이동할 수 있습니다.</p>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0 ml-4">
          <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors" aria-label="Like">
            <ThumbsUp className="h-5 w-5 text-green-500" />
          </button>
          <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors" aria-label="Dislike">
            <ThumbsDown className="h-5 w-5 text-red-500" />
          </button>
          <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors" aria-label="Bookmark">
            <Bookmark className="h-5 w-5 text-blue-500" />
          </button>
          <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors" aria-label="Share">
            <Share2 className="h-5 w-5 text-gray-500" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {items.top && (
          <div className="sm:col-span-1 lg:col-span-1">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3">상의</h3>
            <ClothingItem {...items.top} />
          </div>
        )}
        {items.bottom && (
          <div className="sm:col-span-1 lg:col-span-1">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3">하의</h3>
            <ClothingItem {...items.bottom} />
          </div>
        )}
        {items.outerwear && (
          <div className="sm:col-span-1 lg:col-span-1">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3">아우터</h3>
            <ClothingItem {...items.outerwear} />
          </div>
        )}
        {items.shoes && (
          <div className="sm:col-span-1 lg:col-span-1">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3">신발</h3>
            <ClothingItem {...items.shoes} />
          </div>
        )}
      </div>
    </div>
  );
}
