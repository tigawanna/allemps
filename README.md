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
 ```ts
 baseurl: 'https://allempservice.onrender.com/'
 ```

*AUTH*

`SIGNUP`
```ts
POST api/register
```
| param          | type                 |
|-----------------|----------------------|
|email|string|
|password         |        string      |
| username     |        string      |
| first_name     |        string      |
| last_name     |        string      |

**Response**:
```json
{
  "email": "users1@gmail.com",
  "message": "user registered successfully",
  "status": 200
}
```

`SIGNIN`
```ts
POST /api/login
```
| param          | type                 |
|-----------------|----------------------|
|email|string|
|password         |        string      |

**Response** :
```json
{
  "message": "successful login",
  "email": "users1@gmail.com",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InVzZXJzMUBnbWFpbC5jb20iLCJ1c2VyaWQiOjIxLCJleHAiOjE3MDI1MDE4MjJ9.IcP64lou7XRJivXWevkyh50-QBt_bvbHIRmSIHOJ3kc",
  "status": 200
  
}
```

*POSTS*

**all posts** 
```ts
GET /api/channel/posts
```
| param     | type   | desiciption|
|------------|--------|-----------|
| id |  string  | channel id as query param|


**response 200:**

```json
{
  "data": [
    {
      "post": "Hello everyone, am happy to be here.",
      "user_id": 15
    },
    {
      "post": "Happy to be part of this.",
      "user_id": 16
    }
  ]
}


```
 **add post**
 ```ts
 POST /api/add/post
 ```
| param     | type   | desiciption|
|------------|--------|-----------|
| post |  string  | post title|
| channel_name |  string  | channel name |
| channel_id | string  | channel id |

**response 200:**
```json
{
    "message":"Message sent successfully",
    "status":200
}
```
**response 400:**
```json
{
    "message":"Not allowed to send messages to this channel. Join channel first",
    "status":400
}
```


*CHANNELS*

**all channels** 
```ts
GET /api/all/channels
```

**response 200:**
```json
{
  "data": [
    {
      "channel_name": "General",
      "id": 1
    },
    {
      "channel_name": "Software Engineering",
      "id": 2
    },
    {
      "channel_name": "Devops Engineering",
      "id": 3
    },
    {
      "channel_name": "Backend Engineering",
      "id": 4
    },
    {
      "channel_name": "Frontend Engineering",
      "id": 5
    }
  ]
}
```
 **join channel**
 ```ts
POST /api/join/channel
 ```
| param     | type   | desiciption|
|------------|--------|-----------|
| channel_name|  string  | channel name|

**response 200:**
```json
{
    "message":"member added successfully",
    "status":200
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
