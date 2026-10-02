export interface User {
  id: string;
  email: string;
  name: string;
  role: 'USER' | 'ADMIN';
}

export type ContentType = 'LOVE_STORY' | 'LOVE_CARD';
export type PackageCode = 'FREE' | 'PLUS' | 'COUPLE' | 'PREMIUM';

export interface Template {
  id: string;
  code: string;
  name: string;
  type: ContentType;
  package: PackageCode;
  description: string | null;
  previewImage: string | null;
  recommendedEvents: number;
  maxDisplayEvents: number;
  minEventsForPublish: number;
  sortOrder: number;
  isActive: boolean;
}

export interface Story {
  id: string;
  coupleName1: string;
  coupleName2: string;
  startDate: string;
  templateCode: string;
  coverPhoto: string;
}

export interface Plan {
  id: string;
  code: string;
  name: string;
  price: number;
  description: string;
  features: string[];
  sortOrder: number;
  isActive: boolean;
  isFeatured: boolean;
  maxPhotos: number | null;
  maxStories: number;
  allowCollaborator: boolean;
  allowCustomDomain: boolean;
  websiteDurationDays: number | null;
  maxTotalStories: number | null;
  maxMusicTracks: number;
  maxPhotosPerEvent: number;
  allowPassword: boolean;
  showWatermark: boolean;
}

export interface Order {
  id: string;
  type: 'UPGRADE' | 'RENEW';
  planCode: string | null;
  storyId: string | null;
  renewTerm: '3M' | '1Y' | null;
  amount: number;
  transferCode: string;
  status: 'PENDING' | 'PAID' | 'CANCELLED';
  createdAt: string;
  paidAt: string | null;
  userEmail?: string | null;
  bankName?: string;
  accountNumber?: string;
  accountName?: string;
}
