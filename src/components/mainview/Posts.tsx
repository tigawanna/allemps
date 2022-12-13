import React from 'react'
import { QueryStateWrapper } from '../../shared/extra/QueryStateWrapper';
import {  useQuery } from '@tanstack/react-query';
import { TheIcon } from '../../shared/extra/TheIcon';
import { FaPlus } from 'react-icons/fa';
import { PBPosts} from '../../api/pb-api-types';
import { ReactModalWrapper } from '../../shared/extra/ReactModalWrapper';
import { PostsCard } from './PostsCard';
import { AddPost } from './PostsForm';
import { User } from '../../utils/types';
import { MainViewParamsT } from '../../pages/mainview/MainView';
import { getPosts } from '../../api/methods';
import { FlaskChannel } from '../../api/flask-types';

interface PostsProps {
  user?:User
  params: Readonly<Partial<MainViewParamsT>>
  current_channel?: FlaskChannel
}


export const Posts: React.FC<PostsProps> = ({user,params,current_channel}) => {

const channel_id = params.channel_id??"0ds0fovs0nsas0k"
const posts_url = `https://emps.tigawanna.tech/api/collections/posts/records?expand=channel,emp&filter=channel="${channel_id}"&sort=-created`

const [isOpen, setIsOpen] = React.useState(false);
const query = useQuery(['posts',channel_id],()=>getPosts(1))

const data = query?.data as PBPosts
const posts_list = data?.items


return (
<div className='w-full flex flex-col items-center  p-2 overflow-auto'>

 {/*  posts */}
<div className='w-full flex items-center p-2'>
  
  <div 

  className='w-full p-2 hidden md:flex md:items-center md:justify-center  '>
      <div className=" px-2 flex items-center justify-center
          text-xl bg-slate-900 text-slate-50 rounded-xl">
          {current_channel?.channel_name}
      </div>
 </div>
 
 <div className='fixed bottom-[10%] right-[4%]'>
    <TheIcon Icon={FaPlus} iconAction={()=> setIsOpen(prev => !prev)} size='50'/>
 </div>


 </div>
  <ReactModalWrapper
    isOpen={isOpen}
    closeModal={() => setIsOpen(false)}
      child={<AddPost ch_id={channel_id} user={user}  />}
    styles={{ content_top: "5%" }}
    />

<QueryStateWrapper
error={query.error}
isError={query.isError}
isLoading={query.isLoading}
>
<div className='w-full h-[95%] p-1 gap-2 flex flex-col 
scroll-bar overflow-y-scroll'>
{ posts_list?.map((post,index)=>{
    return( <PostsCard posts={post}  key={post.id} />)
})
}
<button className='mt-5'>...</button>
</div>

</QueryStateWrapper>

</div>


);
}









