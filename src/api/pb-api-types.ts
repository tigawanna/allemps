export interface PBChannels {
  page: number;
  perPage: number;
  totalItems: number;
  totalPages: number;
  items: Item[];
}

export interface Item {
  collectionId: string;
  collectionName: string;
  color: string;
  created: string;
  description: string;
  id: string;
  name: string;
  updated: string;
}
