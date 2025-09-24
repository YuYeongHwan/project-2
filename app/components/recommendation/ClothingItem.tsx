'use client';

import Image from 'next/image';
import Link from 'next/link';

interface ClothingItemProps {
  name: string;
  brand: string;
  imageUrl: string;
  purchaseUrl: string;
}

export default function ClothingItem({ name, brand, imageUrl, purchaseUrl }: ClothingItemProps) {
  return (
    <div className="border rounded-lg p-4 flex flex-col items-center">
      <Image src={imageUrl} alt={name} width={200} height={200} className="object-cover rounded-md" />
      <h3 className="mt-2 text-lg font-semibold">{name}</h3>
      <p className="text-sm text-gray-500">{brand}</p>
      <Link href={purchaseUrl} target="_blank" rel="noopener noreferrer" className="mt-4 inline-block bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors">
        Buy Now
      </Link>
    </div>
  );
}
