
export type Product = {
  id: string;
  name: string;
  brand: string;
  mrp: number;
  expiry: string;
  quantity: string;
  isPerishable: boolean;
  trustScore: number;
  imageUrl?: string;
  lastVerified?: string;
};

export type Review = {
  id: string;
  productId: string;
  text: string;
  isFake: boolean;
  confidence: number;
};

export type Alert = {
  id: string;
  productId: string;
  productName: string;
  issueType: 'expiry' | 'authenticity' | 'review' | 'other';
  severity: 'high' | 'medium' | 'low';
  timestamp: string;
  description: string;
  resolved: boolean;
};

export type TrustScore = {
  id: string;
  productId: string;
  score: number;
  breakdown: {
    authenticity: number;
    reviewValidity: number;
    expiryCompliance: number;
    priceAccuracy: number;
  };
  timestamp: string;
};
