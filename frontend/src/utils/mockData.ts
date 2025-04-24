import { Product, Review, Alert, TrustScore } from './types';

export const mockProducts: Product[] = [
  {
    id: 'prod-001',
    name: 'Organic Whole Milk',
    brand: 'Pure Dairy',
    mrp: 4.99,
    expiry: '2024-06-30',
    quantity: '1 Gallon',
    isPerishable: true,
    trustScore: 96,
    imageUrl: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?q=80&w=180',
    lastVerified: '2024-04-20'
  },
  {
    id: 'prod-002',
    name: 'Premium Honey',
    brand: 'Wild Nectar',
    mrp: 12.99,
    expiry: '2025-01-15',
    quantity: '16 oz',
    isPerishable: false,
    trustScore: 88,
    imageUrl: 'https://images.unsplash.com/photo-1587049633312-d628ae10a8c9?q=80&w=180',
    lastVerified: '2024-04-21'
  },
  {
    id: 'prod-003',
    name: 'Wireless Earbuds',
    brand: 'SoundPro',
    mrp: 129.99,
    expiry: 'N/A',
    quantity: '1 pair',
    isPerishable: false,
    trustScore: 78,
    imageUrl: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?q=80&w=180',
    lastVerified: '2024-04-19'
  },
  {
    id: 'prod-004',
    name: 'Fresh Strawberries',
    brand: 'Farm Fresh',
    mrp: 5.99,
    expiry: '2024-05-02',
    quantity: '16 oz',
    isPerishable: true,
    trustScore: 92,
    imageUrl: 'https://images.unsplash.com/photo-1464965911861-746a04b4bca6?q=80&w=180',
    lastVerified: '2024-04-22'
  },
  {
    id: 'prod-005',
    name: 'Hand Sanitizer',
    brand: 'CleanHands',
    mrp: 3.49,
    expiry: '2026-03-18',
    quantity: '8 oz',
    isPerishable: false,
    trustScore: 97,
    imageUrl: 'https://images.unsplash.com/photo-1584483720412-ce931f4aefa8?q=80&w=180',
    lastVerified: '2024-04-18'
  }
];

export const mockReviews: Review[] = [
  {
    id: 'rev-001',
    productId: 'prod-001',
    text: 'This milk tastes fresh and is perfect for my morning cereal. Highly recommend!',
    isFake: false,
    confidence: 92
  },
  {
    id: 'rev-002',
    productId: 'prod-002',
    text: 'Such amazing honey! It cured my cancer, solved world hunger, and made me live 200 years!!!',
    isFake: true,
    confidence: 96
  },
  {
    id: 'rev-003',
    productId: 'prod-003',
    text: 'These earbuds have decent sound quality but the battery life isn\'t great.',
    isFake: false,
    confidence: 87
  },
  {
    id: 'rev-004',
    productId: 'prod-003',
    text: 'I bought 17 pairs of these earbuds and they all broke within minutes. Waste of money. Will not be giving this company my business again!',
    isFake: true,
    confidence: 89
  }
];

export const mockAlerts: Alert[] = [
  {
    id: 'alert-001',
    productId: 'prod-004',
    productName: 'Fresh Strawberries',
    issueType: 'expiry',
    severity: 'high',
    timestamp: '2024-04-23T08:30:00Z',
    description: 'Product expiration date is within 7 days',
    resolved: false
  },
  {
    id: 'alert-002',
    productId: 'prod-003',
    productName: 'Wireless Earbuds',
    issueType: 'authenticity',
    severity: 'high',
    timestamp: '2024-04-22T14:15:00Z',
    description: 'Product serial number verification failed',
    resolved: true
  },
  {
    id: 'alert-003',
    productId: 'prod-002',
    productName: 'Premium Honey',
    issueType: 'review',
    severity: 'medium',
    timestamp: '2024-04-21T11:45:00Z',
    description: 'Suspicious review patterns detected',
    resolved: false
  }
];

export const mockTrustScores: TrustScore[] = [
  {
    id: 'ts-001',
    productId: 'prod-001',
    score: 96,
    breakdown: {
      authenticity: 98,
      reviewValidity: 94,
      expiryCompliance: 100,
      priceAccuracy: 92
    },
    timestamp: '2024-04-20T10:20:00Z'
  },
  {
    id: 'ts-002',
    productId: 'prod-002',
    score: 88,
    breakdown: {
      authenticity: 95,
      reviewValidity: 78,
      expiryCompliance: 100,
      priceAccuracy: 90
    },
    timestamp: '2024-04-21T09:15:00Z'
  },
  {
    id: 'ts-003',
    productId: 'prod-003',
    score: 78,
    breakdown: {
      authenticity: 72,
      reviewValidity: 68,
      expiryCompliance: 100,
      priceAccuracy: 95
    },
    timestamp: '2024-04-19T16:40:00Z'
  }
];

export const getRecentVerifications = () => {
  return mockProducts.map(product => ({
    id: product.id,
    name: product.name,
    timestamp: product.lastVerified,
    score: product.trustScore
  })).sort((a, b) => new Date(b.timestamp || '').getTime() - new Date(a.timestamp || '').getTime());
};
