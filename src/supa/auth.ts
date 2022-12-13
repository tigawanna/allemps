
import { supabase } from './config';

export async function signUpWithEmail(
  email: string,
  password: string
) {
  try {
const { data, error } =
  await supabase.auth.signUp({
    email, password
  });
    if (error) {
      console.log("error == ", error);
      throw new Error(error.message);
    }
    console.log("data ==== >", data);
    return data;
  } catch (e) {
    throw e;
  }
}


export async function signInWithEmail(email:string,password:string) {
try{
  const { data, error } =
    await supabase.auth.signInWithPassword({
      email,
      password,
    });
     if (error) {
       console.log("error == ", error);
       throw new Error(error.message);
     }
     console.log("data ==== >", data);
     return data;
    }

 catch(e){
throw e
}
}


export async function signOut(

) {
  try {
    const { error } = await supabase.auth.signOut()
    if (error) {
      console.log("error == ", error);
      throw new Error(error.message);
    }
   } catch (e) {
    throw e;
  }
}

