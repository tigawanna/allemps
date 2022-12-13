import React from 'react'
import TheForm from '../../shared/form/TheForm';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { FormOptions } from '../../shared/form/types';
import { loginUser } from '../../api/methods';
import { concatErrors } from '../../utils/utils';
import { useLocalStoreValues } from './../../zustand/store';
import { User } from '../../utils/types';
import { useNavigate } from 'react-router-dom';




interface EmailPasswordLoginProps {

}

export const EmailPasswordLogin: React.FC<EmailPasswordLoginProps> = ({}) => {
    const editing=true
    const [error, setError] = React.useState({ name: "", message: "" })
    const queryClient = useQueryClient();
    const navigate = useNavigate()
    const loc = useLocalStoreValues()
    const form_input: FormOptions[] = [
        { field_name: "email", field_type: "text", default_value: "",editing },
        { field_name: "password", field_type: "password", default_value: "",editing },
   ] 
//    console.log("error in login ==== > ",error) 
    const addUserMutation = useMutation(async(vars: { coll_name: string, payload: FormData }) => {
       try{
           const res = await loginUser(
               vars.payload.get('email') as string,
               vars.payload.get('password') as string
           )
    
        //    loc.updateUser(res )
            console.log("login respnsse === ",res)
            queryClient.setQueryData(['user'], () => res);
            // setAuthing(false)

        }
        catch(err:any){
            console.log("error in login mutation catch block", err.message)
            // setError({ name: "main", message: err?.messge })
            throw err
       }
     },
    {
        onSettled: () => {
            // navigate('/main')
        },
        onError: (err:any) => {
            // console.log("errror logging in ",err.data)
            setError({ name: "main", message: concatErrors(err) })
        }
    }
    )


    const handleSubmit = async (data: FormData) => {
        await addUserMutation.mutate({ coll_name: 'user', payload: data })

    };

// console.log("add mutation ----==> ", addUserMutation)
return (
<div className="w-full h-full flex flex-col items-center justify-center">
    

  <TheForm
   form_title='Login'
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
passwordConfirm:string
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
    if (input.password.length < 1) {
        setError({ name: "password", message: "password minimun length is 1" })
        return false
    }

    setError({ name: "", message: "" })
    return true
}


