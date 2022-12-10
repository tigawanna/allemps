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
import { PBChannels } from './../../api/pb-api-types';
import { User } from '../../utils/types';

interface PostsProps {
  user?:User
}
type ParamsT = {
    channel_id: string
}

export const Posts: React.FC<PostsProps> = ({user}) => {


const params = useParams<ParamsT>()
const channel_id = params.channel_id??"0ds0fovs0nsas0k"

  const posts_url = `https://emps.tigawanna.tech/api/collections/posts/records?expand=channel,emp&filter=channel="${channel_id}"&sort=-created`
const channels_url = `https://emps.tigawanna.tech/api/collections/channels/records?filter=id="${channel_id}"`


const [isOpen, setIsOpen] = React.useState(false);

const query = useQuery(['posts',channel_id],()=>getRecords(posts_url))
const channel_query = useQuery(['channels',channel_id], () => getRecords(channels_url))
const channel = channel_query?.data as PBChannels
const current_channel=channel?.items?.at(0)



const data = query?.data as PBPosts
const posts_list = data?.items


return (
<div className='w-full flex flex-col items-center  p-2 overflow-auto'>

 {/*  posts */}
<div className='w-full flex items-center p-2'>
  <div 
  style={{backgroundColor:current_channel?.color}}
  className='w-full p-2 flex items-center justify-center font-bold text-xl '>
   {current_channel?.name}
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
<div className='w-full h-[80%] p-2 gap-2 flex flex-col items-center  scroll-bar overflow-scroll'>
{ posts_list?.map((post,index)=>{
    return( <PostsCard posts={post}  key={post.id} />)
})
}

</div>

</QueryStateWrapper>

</div>


);
}









