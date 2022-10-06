export interface Job {
  address: string;
  suburb: string;
  postcode: number;
  content: string;
  isRemote: boolean;
  price: string;
  company: string;
  message: string;
  code: number;
  tilte: string;
  createdAt: string;
}

export interface Token {
  username: string;
  iat: number;
  exp: number;
}
