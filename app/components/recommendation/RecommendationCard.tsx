'use client';

import React from 'react';
import ClothingItem from './ClothingItem';
import { ThumbsUp, ThumbsDown, Bookmark } from 'lucide-react';

interface ClothingItemData {
  name: string;
  brand: string;
  imageUrl: string;
  purchaseUrl: string;
}

interface RecommendationCardProps {
  weather: string;
  temperature: string;
  items: {
    top: ClothingItemData;
    bottom: ClothingItemData;
    outerwear: ClothingItemData;
    shoes: ClothingItemData;
  };
}

export default function RecommendationCard({ weather, temperature, items }: RecommendationCardProps) {
  return (
    <div className="bg-white dark:bg-zinc-900 shadow-lg rounded-xl p-6 w-full max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold">Today's Styling Recommendation</h2>
          <p className="text-gray-500 dark:text-gray-400">Based on today's weather: {weather}, {temperature}</p>
        </div>
        <div className="flex gap-2">
          <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors">
            <ThumbsUp className="h-6 w-6 text-green-500" />
          </button>
          <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors">
            <ThumbsDown className="h-6 w-6 text-red-500" />
          </button>
          <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors">
            <Bookmark className="h-6 w-6 text-blue-500" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        <ClothingItem {...items.top} />
        <ClothingItem {...items.bottom} />
        <ClothingItem {...items.outerwear} />
        <ClothingItem {...items.shoes} />
      </div>
    </div>
  );
}
