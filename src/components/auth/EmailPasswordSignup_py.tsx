import React from 'react'
import TheForm from '../../shared/form/TheForm';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { FormOptions } from '../../shared/form/types';
import { registerUser, loginUser } from '../../api/methods';
import { FilterParams } from '../../shared/form/types';
import { concatErrors } from '../../utils/utils';





interface EmailPasswordSignupProps {

}

export const EmailPasswordSignup: React.FC<EmailPasswordSignupProps> = ({}) => {
    const editing= true
    const [error, setError] = React.useState({name: "", message:""})
   const queryClient = useQueryClient();
   const form_input: FormOptions[] = [
        { field_name: "email", field_type: "text", default_value: "",required:true,editing },
        { field_name: "password", field_type: "password", default_value: "", required: true,editing },
        { field_name: "username", field_type: "text", default_value: "", required: true, editing },
        { field_name: "firstname", field_type: "text", default_value: "", required: true, editing },
        { field_name: "lastname", field_type: "text", default_value: "", required: true, editing },

  ]  
    const addUserMutation = useMutation(async(vars: { coll_name: string, payload: FormData }) => {
       try{
        const result = await registerUser(
            vars.payload.get('email') as string,
            vars.payload.get('password') as string,
            vars.payload.get('username') as string,
            vars.payload.get('firstname') as string,
            vars.payload.get('lastname') as string
        )
            console.log("result ===== ",result)
        return await loginUser(
            vars.payload.get('email') as string,
            vars.payload.get('password') as string
        )
         
        }catch(e){
        console.log("error signing up ",e)
           throw e

        }
     
    },
    {
        onSettled: () => {
            queryClient.invalidateQueries(["user"]);
            // navigate('/profile')
            // navigate('/profile')
        },
        onError:(err:any)=>{
            // console.log("mutation error ==== ", concatErrors(err))
            setError({ name: "main", message: concatErrors(err) })
        
        }
    }
    )
    const handleSubmit = async (data: FormData) => {
     await addUserMutation.mutate({ coll_name: 'user', payload: data })
    };

    // console.log("errors state === ",error)
return (
<div className="w-full h-full flex flex-col items-center justify-center">

  <TheForm
   form_title='Sign Up'
   fields={form_input}
   validate={validate}
   submitFn={handleSubmit}
    is_submitting={addUserMutation.isLoading}
    error={error}
    editing={editing}
  />
</div>
);
}

export interface SignupFormInput{
email:string
password:string
username:string
firstname:string
lastname:string
}
interface Validate {
    input: SignupFormInput;
    setError: (error: { name: string; message: string }) => void;
}




const validate = ({ input, setError }: Validate) => {
    // console.log("input === ",input)
    const expression: RegExp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    if (input.email === "") {
        setError({ name: "email", message: "email field required" })
        return false
    }
    if (!expression.test(input.email)){
        setError({ name: "email", message: "invalid email pattern" })
        return false
    }
    if (input.password.length < 8) {
        setError({ name: "password", message: "password minimun length is 8" })
        return false
    }
    if (input.username === "") {
        setError({ name: "username", message: "user name required" })
        return false
    }
    if (input.firstname === "") {
        setError({ name: "firstname", message: "first name required" })
        return false
    }
    if (input.lastname === "") {
        setError({ name: "lastname", message: "lastname required" })
        return false
    }
    setError({ name: "", message: "" })
    return true
}





