# AllEmps

> a community for  developers to meet and interact

### MVP objectives 
- authentication
- edit profile
- view and add posts 
- create and join channels


### Technologies used
- React with typescript and vite 
- Tailwindcss for styling
- react-router for routing
- react-query for server state management
- Dayjs for date parsing




### routes 
```ts
/: landing page
```
```ts
/main: main pages 
```
```ts
/auth: login
```
```ts
/auth/signup: signup
```

```ts
/main:channel_id: main with different channel
```
```ts
/profile: user profile
```

### Used api endpoints 
*AUTH*

`SIGNUP`
```ts
POST /api/collections/emps/records
```
| param          | type                 |
|-----------------|----------------------|
|email|string|
|password         |        string      |
|confirmPassword     |        string      |

**Response**:
```json
{
  "id": "RECORD_ID",
  "collectionId": "v413duct7bz5oxl",
  "collectionName": "emps",
  "created": "2022-01-01 01:00:00.123Z",
  "updated": "2022-01-01 23:59:59.456Z",
  "username": "username123",
  "verified": false,
  "emailVisibility": true,
  "email": "test@example.com",
  "avatar": "filename.jpg",
  "name": "test",
  "bio": "test",
  "country": "test",
  "phone": "test",
  "cv": "https://example.com"
}
```

`SIGNIN`
```ts
POST /api/collections/emps/auth-with-password
```
| param          | type                 |
|-----------------|----------------------|
|email|string|
|password         |        string      |

**Response** :
```json
{
  "token": "JWT_TOKEN",
  "record": {
    "id": "RECORD_ID",
    "collectionId": "v413duct7bz5oxl",
    "collectionName": "emps",
    "created": "2022-01-01 01:00:00.123Z",
    "updated": "2022-01-01 23:59:59.456Z",
    "username": "username123",
    "verified": false,
    "emailVisibility": true,
    "email": "test@example.com",
    "avatar": "filename.jpg",
    "name": "test",
    "bio": "test",
    "country": "test",
    "phone": "test",
    "cv": "https://example.com"
  }
}
```

*POSTS*

**all posts** 
```ts
GET /api/collections/posts/records
```
**response 200:**

```json
{
  "page": 1,
  "perPage": 30,
  "totalPages": 1,
  "totalItems": 2,
  "items": [
    {
      "id": "RECORD_ID",
      "collectionId": "ty77b4sbvnzgcl6",
      "collectionName": "posts",
      "created": "2022-01-01 01:00:00.123Z",
      "updated": "2022-01-01 23:59:59.456Z",
      "title": "test",
      "body": "test",
      "media": "filename.jpg",
      "emp": "RELATION_RECORD_ID",
      "channel": "RELATION_RECORD_ID"
    },
    {
      "id": "RECORD_ID",
      "collectionId": "ty77b4sbvnzgcl6",
      "collectionName": "posts",
      "created": "2022-01-01 01:00:00.123Z",
      "updated": "2022-01-01 23:59:59.456Z",
      "title": "test",
      "body": "test",
      "media": "filename.jpg",
      "emp": "RELATION_RECORD_ID",
      "channel": "RELATION_RECORD_ID"
    }
  ]
}


```
 **add post**
 ```ts
 POST /api/collections/posts/records
 ```
| param     | type   | desiciption|
|------------|--------|-----------|
| title |  string  | post title|
| body |  string  | post body |
| media |  File  | 	File object Set to null to delete already uploaded file(s). |
| channel|  string  | channel id user is posting to|
| emp |  string    | logged in  user id |

**response 200:**
```json
{
  "id": "RECORD_ID",
  "collectionId": "ty77b4sbvnzgcl6",
  "collectionName": "posts",
  "created": "2022-01-01 01:00:00.123Z",
  "updated": "2022-01-01 23:59:59.456Z",
  "title": "test",
  "body": "test",
  "media": "filename.jpg",
  "emp": "RELATION_RECORD_ID",
  "channel": "RELATION_RECORD_ID"
}
```



*CHANNELS*

**all channels** 
```ts
GET /api/collections/channels/records
```

**response 200:**
```json
{
  "page": 1,
  "perPage": 30,
  "totalPages": 1,
  "totalItems": 2,
  "items": [
    {
      "id": "RECORD_ID",
      "collectionId": "ncv5elwllrc1vjo",
      "collectionName": "channels",
      "created": "2022-01-01 01:00:00.123Z",
      "updated": "2022-01-01 23:59:59.456Z",
      "name": "test",
      "description": "test",
      "color": "test",
      "banner": "filename.jpg"
    },
    {
      "id": "RECORD_ID",
      "collectionId": "ncv5elwllrc1vjo",
      "collectionName": "channels",
      "created": "2022-01-01 01:00:00.123Z",
      "updated": "2022-01-01 23:59:59.456Z",
      "name": "test",
      "description": "test",
      "color": "test",
      "banner": "filename.jpg"
    }
  ]
}
```
 **add channel**
 ```ts
POST /api/collections/channels/records
 ```
| param     | type   | desiciption|
|------------|--------|-----------|
|name|  string  | channel name|
| description |  string  | brief channel description |
| color |  string  | channel theme color |
| banner |  File  | 	File object Set to null to delete already uploaded file(s). |
| creator |  string      | logged in  user id |
**response 200:**
```json
{
  "id": "RECORD_ID",
  "collectionId": "ncv5elwllrc1vjo",
  "collectionName": "channels",
  "created": "2022-01-01 01:00:00.123Z",
  "updated": "2022-01-01 23:59:59.456Z",
  "name": "test",
  "description": "test",
  "color": "test",
  "banner": "filename.jpg"
}
```

*MEMBERS*

**all members** 
```ts
GET /api/collections/members/records
```
**response 200:**
```json
{
  "page": 1,
  "perPage": 30,
  "totalPages": 1,
  "totalItems": 2,
  "items": [
    {
      "id": "RECORD_ID",
      "collectionId": "itx3woboq8f3wao",
      "collectionName": "members",
      "created": "2022-01-01 01:00:00.123Z",
      "updated": "2022-01-01 23:59:59.456Z",
      "channel": "RELATION_RECORD_ID",
      "emp": "RELATION_RECORD_ID"
    },
    {
      "id": "RECORD_ID",
      "collectionId": "itx3woboq8f3wao",
      "collectionName": "members",
      "created": "2022-01-01 01:00:00.123Z",
      "updated": "2022-01-01 23:59:59.456Z",
      "channel": "RELATION_RECORD_ID",
      "emp": "RELATION_RECORD_ID"
    }
  ]
}
```

 **add member**
 ```ts
POST /api/collections/members/records
 ```
| param     | type   | desiciption|
|------------|--------|-----------|
|channel|  string  | channel id user wants to join|
|emp |  string      | logged in  user id |

**response 200:**
```json
{
  "id": "RECORD_ID",
  "collectionId": "itx3woboq8f3wao",
  "collectionName": "members",
  "created": "2022-01-01 01:00:00.123Z",
  "updated": "2022-01-01 23:59:59.456Z",
  "channel": "RELATION_RECORD_ID",
  "emp": "RELATION_RECORD_ID"
}
```
