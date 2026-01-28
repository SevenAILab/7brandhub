export interface Provider {
  id: number;
  name: string;
  slug: string;
  city: string;
  foundedYear: number;
  categories: string[];
  slogan: string;
  description: string;
  clients: string[];
  verified: boolean;
  weight: number;
  logo?: string;
  contact?: {
    phone?: string;
    email?: string;
    website?: string;
    address?: string;
  };
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  icon: string;
}

export interface City {
  name: string;
  slug: string;
}
