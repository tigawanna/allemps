export interface PBChannels {
  page: number;
  perPage: number;
  totalItems: number;
  totalPages: number;
  items: ChannelItem[];
}

export interface ChannelItem {
  collectionId: string;
  collectionName: string;
  color: string;
  created: string;
  description: string;
  id: string;
  name: string;
  updated: string;
}

export interface PBPosts {
  page: number;
  perPage: number;
  totalItems: number;
  totalPages: number;
  items: PostsItem[];
}

export interface PostsItem {
  body: string;
  channel: string;
  collectionId: string;
  collectionName: string;
  created: string;
  emp: string;
  id: string;
  media: string;
  title: string;
  updated: string;
}
