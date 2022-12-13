// export interface PBChannels {
//   page: number;
//   perPage: number;
//   totalItems: number;
//   totalPages: number;
//   items: ChannelItem[];
// }

// export interface ChannelItem {
//   collectionId: string;
//   collectionName: string;
//   color: string;
//   created: string;
//   description: string;
//   id: string;
//   name: string;
//   updated: string;
// }

export interface PBPosts {
  page: number;
  perPage: number;
  totalItems: number;
  totalPages: number;
  items: PostsItem[];
}

export interface PBMembers {
  page: number;
  perPage: number;
  totalItems: number;
  totalPages: number;
  items: Member[];
}

export interface Member{
  channel: string;
  collectionId: string;
  collectionName: string;
  created: string;
  emp: string;
  expand: MemberExpand;
  id: string;
  updated: string;
}

export interface MemberExpand {
  channel: Channel;
  emp: Emp;
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
  expand:PostsExpand
}


export interface PostsExpand {
  channel: Channel;
  emp:Emp;
}

export interface Channel {
  banner: string;
  collectionId: string;
  collectionName: string;
  color: string;
  created: string;
  description: string;
  id: string;
  name: string;
  updated: string;
}
export interface Emp {
  avatar: string;
  bio: string;
  collectionId: string;
  collectionName: string;
  country: string;
  created: string;
  cv: string;
  emailVisibility: boolean;
  id: string;
  name: string;
  phone: string;
  updated: string;
  username: string;
  verified: boolean;
}
