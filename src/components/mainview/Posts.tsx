import React from 'react'
import { QueryStateWrapper } from '../../shared/extra/QueryStateWrapper';
import {  useQuery } from '@tanstack/react-query';
import {  getRecords} from '../../api/pb';
import { TheIcon } from '../../shared/extra/TheIcon';
import { FaPlus } from 'react-icons/fa';
import { PBPosts} from '../../api/pb-api-types';
import { ReactModalWrapper } from '../../shared/extra/ReactModalWrapper';
import { PostsCard } from './PostsCard';
import { AddPost } from './PostsForm';
import { useParams } from 'react-router-dom';

interface PostsProps {

}
type ParamsT = {
    channel_id: string
}

export const Posts: React.FC<PostsProps> = ({}) => {


const params = useParams<ParamsT>()
const channel_id = params.channel_id??"0ds0fovs0nsas0k"

    const posts_url = `https://emps.tigawanna.tech/api/collections/posts/records?expand=channel,emp&filter=channel="${channel_id}"`
const [isOpen, setIsOpen] = React.useState(false);
const query = useQuery(['posts',channel_id],()=>getRecords(posts_url))
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
    child={<AddPost />}
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









