export interface ClothingItem {
  id: string;
  type: string;
  name: string;
  brand: string;
  imageUrl: string;
  description: string;
  purchaseUrl: string;
}

export interface RecommendationResponse {
  recommendations: ClothingItem[];
}

export interface Recommendation {
  weather: string;
  temperature: string;
  items: {
    top: ClothingItem;
    bottom: ClothingItem;
    outerwear: ClothingItem;
    shoes: ClothingItem;
  };
}
