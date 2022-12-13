import { useLocalStoreValues } from "../zustand/store";

export const flask_base_url = 'https://allempservice.onrender.com/'


// authentication state
export const isUserLoggedIn=async()=>{
const { localValues} = useLocalStoreValues.getState();
console.log("loval values === ",localValues)
  if(localValues?.user){
    return localValues.user
  }
  return null
}

// authentication login
export const registerUser = async (
  email: string,
  password: string,
  username: string,
  firstname: string,
  lastname: string
) => {
  let headersList = {
    Accept: "*/*",
    "Content-Type": "application/json",
  };

  let bodyContent = JSON.stringify({
    email,
    password,
    username,
    firstname,
    lastname,
  });

  let response = await fetch(
    flask_base_url+"api/register",
    {
      method: "POST",
      body: bodyContent,
      headers: headersList,
    }
  );

  let data = await response.json();
    if (data.status === 400) {
      throw new Error(data.message);
     
    }
  console.log("register respose data ", data);
};


// authentication signup
export const loginUser = async (
  email: string,
  password: string
) => {
  let headersList = {
    "Accept": "*/*",
    "Content-Type": "application/json",
  };

  let bodyContent = JSON.stringify({
    email,
    password,
  });

  let response = await fetch(
    flask_base_url+"api/login",
    {
      method: "POST",
      body: bodyContent,
      headers: headersList,
    }
  );
  const { localValues, updateUser } = useLocalStoreValues.getState();
  let data = await response.json();
  if(data.status === 400){
    throw new Error(data.message)
    
  }
  if(data.token){
    updateUser(data)
    return data
  }
  console.log("login response data ====> ", data,localValues);

};


export const followUser = async (username: string,user_token: string) => {
  let headersList = {
    Accept: "*/*",
    Authorization: "Bearer " + user_token,
    "Content-Type": "application/json",
  };

  let bodyContent = JSON.stringify({
    username,
  });

  let response = await fetch(
    "https://allempservice.onrender.com/aapi/follow/user",
    {
      method: "POST",
      body: bodyContent,
      headers: headersList,
    }
  );

  let data = await response.json();
  if (data.status === 400) {
    throw new Error(data.message);
  }
  console.log("follow  response data ", data);
  return data;
};

export const unfollowUser = async (
  username: string,
  user_token: string
) => {
  let headersList = {
    Accept: "*/*",
    Authorization: "Bearer " + user_token,
    "Content-Type": "application/json",
  };

  let bodyContent = JSON.stringify({
    username,
  });

  let response = await fetch(
    "https://allempservice.onrender.com/aapi/unfollow/user",
    {
      method: "POST",
      body: bodyContent,
      headers: headersList,
    }
  );

  let data = await response.json();
  if (data.status === 400) {
    throw new Error(data.message);
  }
  console.log("follow  response data ", data);
  return data;
};

export const joinChannel =async(channel_name:string,user_token:string)=>{
  let headersList = {
    Accept: "*/*",
    Authorization:
    "Bearer "+user_token ,
    "Content-Type": "application/json",
  };

  let bodyContent = JSON.stringify({
    channel_name,
  });

  let response = await fetch(
    "https://allempservice.onrender.com/api/join/channel",
    {
      method: "POST",
      body: bodyContent,
      headers: headersList,
    }
  );

  let data = await response.json();
  if (data.status === 400) {
    throw new Error(data.message);
  }
  console.log("add channel respose data ", data);
  return data
  
}

interface addPostArgs {
  post: string;
  channel_id: number;
  channel_name: string;
  user_token: string;
}
export const addPosts = async (
{channel_id,channel_name,post,user_token}:addPostArgs
) => {
  let headersList = {
    Accept: "*/*",
    Authorization: "Bearer " + user_token,
    "Content-Type": "application/json",
  };

  let bodyContent = JSON.stringify({
    post,
    channel_id,
    channel_name,
  });

  let response = await fetch(
    "https://allempservice.onrender.com/api/add/post",
    {
      method: "POST",
      body: bodyContent,
      headers: headersList,
    }
  );

  let data = await response.json();
  if (data.status === 400) {
    throw new Error(data.message);
  }
  console.log("add posts respose data ", data);
  return data;
};


export const getChannels=async()=>{
let headersList = {
  Accept: "*/*",
};

let response = await fetch(
  "https://allempservice.onrender.com/api/all/channels",
  {
    method: "GET",
    headers: headersList,
  }
);

  let data = await response.json();
  if (data.status === 400) {
    throw new Error(data.message);
  }
  console.log("follow  response data ", data);
  return data;
}

export const getPosts = async (id:number) => {
  let headersList = {
    Accept: "*/*",
  };


let response = await fetch(
  `https://allempservice.onrender.com/api/channel/posts?id=${id}`,
  {
    method: "GET",
    headers: headersList,
  }
);


  let data = await response.json();
  if (data.status === 400) {
    throw new Error(data.message);
  }
  console.log("posts  response data ", data);
  return data;
};
