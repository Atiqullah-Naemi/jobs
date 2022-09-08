export interface Lister {
  username: string;
  imageUrl: string;
}

export interface Property {
  address: string;
  suburb: string;
  postcode: number;
  content: string;
  price: string;
  bedrooms: string;
  bathrooms: string;
  carparks: string;
  type: string;
  landSize: string;
  buildingSize: string;
  imageUrl?: string;
  lister?: Lister;
  message: string;
  code: number;
}
