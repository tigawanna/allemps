import React from 'react'
import { QueryStateWrapper } from '../../shared/extra/QueryStateWrapper';
import { useMutation, useQuery } from '@tanstack/react-query';
import { createRecords, getRecords} from './../../api/pb';
import { RiArrowDropDownLine } from 'react-icons/ri'
import { TheIcon } from '../../shared/extra/TheIcon';
import { FaSearch } from 'react-icons/fa';
import { concatErrors } from '../../utils/utils';
import { PBMembers } from '../../api/pb-api-types';
import { FormOptions } from '../../shared/form/types';
import TheForm from './../../shared/form/TheForm';
import { ReactModalWrapper } from '../../shared/extra/ReactModalWrapper';
import { useParams } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { User } from '../../utils/types';
import { makeUrl } from './../../pb/config';
import { FaUserCircle } from "react-icons/fa";

interface MembersProps {
   user?:User
}
type ParamsT = {
    channel_id: string
}

export const Members: React.FC<MembersProps> = ({}) => {
const params = useParams<ParamsT>()
const [show,setShow] = React.useState(true)
const [keyword, setKeyword] = React.useState("")
const [isOpen, setIsOpen] = React.useState(false);

const members_url = `https://emps.tigawanna.tech/api/collections/members/records?expand=emp,channel
&sort=-created&filter=channel="${params.channel_id}"&emp.name="${keyword}"`
const query = useQuery(['members',members_url],()=>getRecords(members_url))
const channels_url = `https://emps.tigawanna.tech/api/collections/channels/records?sort=-created&filter=id="${params.channel_id}"`
const ch_query = useQuery(['channels', channels_url], () => getRecords(channels_url))
const data = query?.data as PBMembers
const members = data?.items

const handleChange = (e: React.ChangeEvent<HTMLInputElement>)=>{
  setKeyword(e.target.value)
}

const channel = ch_query.data?.items[0]

// console.log("data === ",data)
return (
<div className='w-full  flex flex-col items-center justify-center p-2'>
{params.channel_id ?<div className='w-full flex flex-col items-center justify-center rounded p-2 
border shadow-md shadow-slate-600  border-slate-500 dark:border-slate-200'>
 {/*  channnel tab heading and toggle buttons */}
<div className='w-[95%] flex items-center p-2'>
  <div className='w-[95%] flex items-center justify-center font-bold text-xl p-2'>
   {channel?.name} members
 </div>

 {/* <TheIcon Icon={FaPlus} iconAction={() => setIsOpen(prev => !prev)} /> */}
 <TheIcon Icon={RiArrowDropDownLine} iconAction={() => setShow(prev => !prev)} size='30'/>
 </div>

  <ReactModalWrapper
    isOpen={isOpen}
    closeModal={() => setIsOpen(false)}
    child={<AddChannel />}
    styles={{ content_top: "5%" }}
    />

{show?
<div>
    <div className='w-[95%] flex items-center justify-center gap-[2px]'>
     <TheIcon Icon={FaSearch} size='20' />
    <input
    onChange={handleChange}
    value={keyword}
    disabled={!show}
    className='w-full rounded-lg border-[1px]'
    />
    </div>
<QueryStateWrapper
error={query.error}
isError={query.isError}
isLoading={query.isLoading}
>
<div className='w-full flex flex-wrap items-center justify-center p-2'>
{ members?.map((member,index)=>{
    const avatar = makeUrl('emps', member?.expand?.emp.id as string, member?.expand?.emp.avatar)
    return(
     <div 
     key={member.id}
     className="  rounded-md  flex flex-col justify-center items-center 
              w-16  h-full  aspect-square">
            {avatar === "" ? (
                <TheIcon
                    Icon={FaUserCircle}
                    size={"25"}
                    color={""}
                    iconAction={() => setIsOpen(true)}
                />

            ) : (
                <img
                    src={avatar}
                    alt={""}
                    className="rounded-[50%] hover:rounded-sm max-h-[40px] h-10 w-10
              border-2 border-slate-900 dark:border-slate-100 aspect-square"
                    onClick={() => setIsOpen(true)}
                />
            )}
            <div className='text-xs'
            >{member?.expand?.emp.name}</div>
        </div>
    )
})
}

</div>
<button className='mt-5'>...</button>
</QueryStateWrapper>
</div>:null
}

</div>:null}

</div>
);
}



interface AddChannelProps {
    closeModal?: () => void
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


export const AddChannel: React.FC<AddChannelProps> = ({closeModal}) => {
    const editing =true
   const queryClient = useQueryClient()
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
                queryClient.invalidateQueries(['channels']);
                closeModal&&closeModal()
                
            },
            onError: (err: any) => {
                // console.log("errror logging in ", err.data)
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
