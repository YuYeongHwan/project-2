import { Recommendation } from './types';

export const mockRecommendation: Recommendation = {
  weather: '맑음',
  temperature: '23°C',
  items: {
    top: {
      id: '1',
      type: 'top',
      name: '클래식 화이트 티셔츠',
      brand: '브랜드A',
      imageUrl: '/app-mockup.png', // Using an existing image for placeholder
      description: '어디에나 잘 어울리는 100% 순면 티셔츠입니다.',
      purchaseUrl: 'https://example.com/product/1',
    },
    bottom: {
      id: '2',
      type: 'bottom',
      name: '슬림핏 청바지',
      brand: '브랜드B',
      imageUrl: '/app-mockup.png', // Using an existing image for placeholder
      description: '편안하면서도 스타일리시한 슬림핏 청바지입니다.',
      purchaseUrl: 'https://example.com/product/2',
    },
    outerwear: {
      id: '3',
      type: 'outerwear',
      name: '경량 바람막이',
      brand: '브랜드C',
      imageUrl: '/app-mockup.png', // Using an existing image for placeholder
      description: '가볍고 방수 기능이 있는 실용적인 바람막이입니다.',
      purchaseUrl: 'https://example.com/product/3',
    },
    shoes: {
      id: '4',
      type: 'shoes',
      name: '데일리 스니커즈',
      brand: '브랜드D',
      imageUrl: '/app-mockup.png', // Using an existing image for placeholder
      description: '매일 신기 좋은 편안한 디자인의 스니커즈입니다.',
      purchaseUrl: 'https://example.com/product/4',
    },
  },
};
