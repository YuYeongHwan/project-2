'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ShoppingCart } from 'lucide-react';
import { ClothingItem as ClothingItemProps } from '@/lib/types';

export default function ClothingItem({ name, brand, imageUrl, purchaseUrl }: ClothingItemProps) {
  return (
    <div className="group relative overflow-hidden rounded-lg shadow-lg transition-transform duration-300 ease-in-out hover:scale-105">
      <Link href={purchaseUrl} target="_blank" rel="noopener noreferrer">
        <Image src={imageUrl} alt={name} width={300} height={400} className="object-cover w-full h-full" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        <div className="absolute bottom-0 left-0 p-4 text-white">
          <p className="text-sm font-light text-gray-200">{brand}</p>
          <h3 className="text-lg font-semibold">{name}</h3>
        </div>
      </Link>
      <Link href={purchaseUrl} target="_blank" rel="noopener noreferrer" className="absolute top-4 right-4 z-10 flex items-center gap-2 rounded-full bg-indigo-600 px-3 py-2 text-xs font-semibold text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100 hover:bg-indigo-700">
        <ShoppingCart size={16} />
        <span>Buy Now</span>
      </Link>
    </div>
  );
}
