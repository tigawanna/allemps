import { useLocalStoreValues } from "../zustand/store";
import { client } from './../pb/config';






export const isUserLoggedIn=async()=>{
const { localValues} = useLocalStoreValues.getState();
  if(localValues?.user){
    return localValues.user
  }
  return null
}


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
    "https://allempservice.onrender.com/api/register",
    {
      method: "POST",
      body: bodyContent,
      headers: headersList,
    }
  );

  let data = await response.json();
    if (data.status === 400) {
      throw new Error(data.message);
      return;
    }
  console.log("register respose data ", data);
};



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
    "https://allempservice.onrender.com/api/login",
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
    // updateUser({email:data.email,token:data.token})
  }
  console.log("login response data ====> ", data,localValues);

};



