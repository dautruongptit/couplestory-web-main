export interface User {
  id: string;
  email: string;
  name: string;
  role: 'USER' | 'ADMIN';
}

export interface Template {
  id: string;
  name: string;
  code: string;
  thumbnail: string;
  type: 'FREE' | 'PREMIUM';
  description: string;
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
}
