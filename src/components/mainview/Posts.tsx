import React from 'react'
import { QueryStateWrapper } from '../../shared/extra/QueryStateWrapper';
import { useMutation, useQuery } from '@tanstack/react-query';
import { createRecords, getRecords} from '../../api/pb';
import { RiArrowDropDownLine } from 'react-icons/ri'
import { TheIcon } from '../../shared/extra/TheIcon';
import { FaPlus } from 'react-icons/fa';

import { concatErrors } from '../../utils/utils';
import { PBChannels, PBPosts, PostsItem } from '../../api/pb-api-types';
import { FormOptions } from '../../shared/form/types';
import TheForm from '../../shared/form/TheForm';
import { ReactModalWrapper } from '../../shared/extra/ReactModalWrapper';

interface PostsProps {

}

export const Posts: React.FC<PostsProps> = ({}) => {
    const posts_url = "https://emps.tigawanna.tech/api/collections/posts/records"

const [isOpen, setIsOpen] = React.useState(false);
const query = useQuery(['posts'],()=>getRecords(posts_url))
const data = query?.data as PBPosts
const posts_list = data?.items
console.log("posts === ",data)

return (
<div className='w-full flex flex-col items-center  p-2 overflow-auto'>

 {/*  posts */}
<div className='w-full flex items-center p-2'>
  <div className='w-full p-2 flex items-center justify-center font-bold text-xl'>
    Posts
 </div>
 <div className='fixed bottom-[10%] right-[4%]'>
    <TheIcon Icon={FaPlus} iconAction={()=> setIsOpen(prev => !prev)} size='50'/>
 </div>


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
<div className='w-full h-[80%] p-2 gap-2 flex flex-col items-center  scroll-bar overflow-scroll'>
{ posts_list?.map((post,index)=>{
    return( <PostsCard posts={post}  key={post.id}/>)
})
}

</div>

</QueryStateWrapper>

</div>


);
}



interface AddPostProps {

}
interface FormInput {
    title:string;
    body:string
    media:string,
    emp:string,
    channel:string
}
interface Validate {
    input: FormInput;
    setError: (error: { name: string; message: string }) => void;
}


export const AddChannel: React.FC<AddPostProps> = ({}) => {
    const editing =true
   
    const validate = ({ input, setError }: Validate) => {

         const assertNotNull = () => {
             const exclude = [""]
            for (const item in input) {
                if (input[item as keyof typeof input] ===""&& !exclude.includes(item)){
                    if(item === "emp" || item ==="channel"){
                        setError({ name:"main", message: item + " can't be null " })
                    }
                   setError({name:item,message:item+" can't be null "})
                    return false
                }
            }
            return true
        
        }
       if (assertNotNull()){
           setError({ name: "", message: "" })
           return false
       }
        
 
       return false
    }

   const form_input: FormOptions[] = [
        { field_name: "title", field_type: "text", default_value:"", editing },
        { field_name: "body", field_type: "textarea", default_value:"", editing },
       { field_name: "media", field_type: "file", default_value: "", editing },
       { field_name: "emp", field_type: "text", default_value: "", editing, hidden: true },
       { field_name: "channel", field_type: "text", default_value: "", editing, hidden: true },

    ]


    const [error, setError] = React.useState({ name: "", message: "" })
    const create_url = "https://emps.tigawanna.tech/api/collections/posts/records"

   const mutation = useMutation(
     async (vars: {
       coll_name: string;
       payload: FormData;
     }) => {
       try {
         return await createRecords(
           vars.payload,
           create_url
         );
       } catch (e) {
         throw e;
       }
     },
     {
       onSettled: () => {
         //   queryClient.invalidateQueries(['shops-bills',shop_id as string]);
       },
       onError: (err: any) => {
         console.log(
           "errror logging in ",
           err.data
         );
         setError({
           name: "main",
           message: concatErrors(err),
         });
       },
     }
   );

    const handleSubmit = async (data: FormData) => {
        await mutation.mutate({ coll_name: 'posts', payload:data })
    };
return (
    <div className='w-full  border p-2 flex
    dark:text-white '>
        <TheForm
            form_title='New Post'
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



interface PostsCardProps {
    posts: PostsItem
}

export const PostsCard: React.FC<PostsCardProps> = ({posts}) => {
return (
    <div key={posts.id}
        className='w-[80%] flex flex-col items-center p-2
        border border-slate-700 dark:border-slate-100
        rounded-lg '>
        <div className='w-full flex items-center 
            text-xl font-bold
            '>
            {posts.title}
        </div>

        <div className='w-full flex items-center justify-center p-2'>
            <div className='w-full  line-clamp-4'>
                {posts.body}
            </div>
        </div>

    </div>
);
}
