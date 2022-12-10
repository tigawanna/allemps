# routes 

### - Root
### - Auth
- default login
- /signup

### - MainView  `components`
- Channels
  ```curl
   GET "https://emps.tigawanna.tech/api/collections/channels/records?sort=-created"
```
type
```ts
interface PBChannels {
  page: number;
  perPage: number;
  totalItems: number;
  totalPages: number;
  items: ChannelItem[];
}

interface ChannelItem {
  collectionId: string;
  collectionName: string;
  color: string;
  created: string;
  description: string;
  id: string;
  name: string;
  updated: string;
}

```
- Posts:
  ```curl
  GET `https://emps.tigawanna.tech/api/collections/channels/records`
```
```ts
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


```
