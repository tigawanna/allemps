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
import { pb_url } from './../../utils/env';
import { PostsCard } from './PostsCard';
import { AddPost } from './PostsForm';

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









