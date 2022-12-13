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



