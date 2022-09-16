export interface Lister {
  username: string;
  imageUrl: string;
}

export interface Job {
  address: string;
  suburb: string;
  postcode: number;
  content: string;
  type: string;
  salary: string;
  lister: Lister;
  message: string;
  code: number;
  tilte: string;
  createdAt: string;
}
