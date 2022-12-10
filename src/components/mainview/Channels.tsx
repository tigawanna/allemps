import React from 'react'
import { QueryStateWrapper } from '../../shared/extra/QueryStateWrapper';
import { useMutation, useQuery } from '@tanstack/react-query';
import { createRecords, getRecords} from './../../api/pb';
import { RiArrowDropDownLine } from 'react-icons/ri'
import { TheIcon } from '../../shared/extra/TheIcon';
import { FaPlus } from 'react-icons/fa';

import { concatErrors } from '../../utils/utils';
import { PBChannels } from '../../api/pb-api-types';
import { FormOptions } from '../../shared/form/types';
import TheForm from './../../shared/form/TheForm';
import { ReactModalWrapper } from '../../shared/extra/ReactModalWrapper';

interface ChannelsProps {

}

export const Channels: React.FC<ChannelsProps> = ({}) => {
const cahhnels_url = "https://emps.tigawanna.tech/api/collections/channels/records"
const [show,setShow] = React.useState(true)
const [isOpen, setIsOpen] = React.useState(false);
const query = useQuery(['channels'],()=>getRecords(cahhnels_url))
const data = query?.data as PBChannels
const channels = data?.items
// console.log("data === ",data)
return (
<div className='w-full flex flex-col items-center justify-center p-2'>
<div className='w-full flex flex-col items-center justify-center rounded p-2 
border shadow-md shadow-slate-600  border-slate-500 dark:border-slate-200'>
 {/*  channnel tab heading and toggle buttons */}
<div className='w-[95%] flex items-center p-2'>
  <div className='w-[95%] flex items-center justify-center font-bold text-xl p-2'>
    Channels
 </div>
 <TheIcon Icon={FaPlus} iconAction={() => setIsOpen(prev => !prev)} />
 <TheIcon Icon={RiArrowDropDownLine} iconAction={() => setShow(prev => !prev)} size='30'/>
 </div>
  <ReactModalWrapper
    isOpen={isOpen}
    closeModal={() => setIsOpen(false)}
    child={<AddChannel />}
    styles={{ content_top: "5%" }}
    />

<QueryStateWrapper
error={query.error}
isError={query.isError}
isLoading={query.isLoading}
>
<div className='w-full flex flex-col items-center justify-center '>
{ show&&channels?.map((channel,index)=>{
    return(
        <div key={channel.id} className='w-[80%] p-1 hover:bg-slate-300 dark:hover:bg-slate-800
        flex items-center justify-center text-sm border-b dark:border-b-[1px] 
         border-slate-600 dark:border-slate-300 shadow-lg dark:shadow-slate-600 rounded'>
          #{channel.name}
        </div>
    )
})
}
</div>
</QueryStateWrapper>

</div>

</div>
);
}



interface AddChannelProps {

}

interface FormInput {
name:string;
description:string;
color?:string
banner?:string
}

interface QueryFnProps {
    keyword: string
    key: string[]
}
interface Validate {
    input: FormInput;
    setError: (error: { name: string; message: string }) => void;
}


export const AddChannel: React.FC<AddChannelProps> = ({}) => {
    const editing =true
   
    const validate = ({ input, setError }: Validate) => {
        
         const assertNotNull = () => {
             const exclude = ["banner"]
            for (const item in input) {
                console.log("input.item", input[item as keyof typeof input])
                if (input[item as keyof typeof input] ===""&& !exclude.includes(item)){
                    // console.log("error , this cant be nul",item)
                    setError({name:item,message:item+" can't be null "})
                    return false
                  
                }
            }
            return true
        
        }
       if (assertNotNull()){
           setError({ name: "", message: "" })
           return true
       }
        
 
       return false
    }

   const form_input: FormOptions[] = [
        { field_name: "name", field_type: "text", default_value:"", editing },
        { field_name: "description", field_type: "text", default_value:"", editing },
        { field_name: "color", field_type: "color", default_value:"#ffffff", editing, },
        { field_name: "banner", field_type: "file", default_value:"", editing },
    ]


    const [error, setError] = React.useState({ name: "", message: "" })
    const create_url = "https://emps.tigawanna.tech/api/collections/channels/records"

   const mutation = useMutation(async (vars: { coll_name: string, payload: FormData }) => {
    try {
        return await createRecords(vars.payload,create_url)
        }
        catch (e) {
            throw e
        }
    },
        {
            onSettled: () => {
                //   queryClient.invalidateQueries(['shops-bills',shop_id as string]);
            },
            onError: (err: any) => {
                console.log("errror logging in ", err.data)
                setError({ name: "main", message: concatErrors(err) })
            }
        })

    const handleSubmit = async (data: FormData) => {
        await mutation.mutate({ coll_name: 'channels', payload:data })
    };
return (
    <div className='w-full  border p-2 flex
    dark:text-white '>
        <TheForm
            form_title='Create New Channel'
            fields={form_input}
            validate={validate}
            submitFn={handleSubmit}
            is_submitting={mutation.isLoading}
            error={error}
            editing={editing}

        />

    </div>
);
}
