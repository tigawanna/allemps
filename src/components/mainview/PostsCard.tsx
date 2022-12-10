import { Emp, PostsItem } from "../../api/pb-api-types";
import { pb_url } from './../../utils/env';

interface PostsCardProps {
    posts: PostsItem
}

export const PostsCard: React.FC<PostsCardProps> = ({ posts }) => {
    return (
        <div key={posts.id}
            className='w-[80%] flex flex-col items-center p-2
           border border-slate-700 dark:border-slate-100
             rounded-lg '>
            <PostsuserCard emp={posts.expand.emp}/>
            <div className='w-full flex items-center text-xl font-bold p-1'>
                {posts.title}
            </div>

            <div className='w-full flex items-center justify-center p-2'>
                <img src={makeUrl('posts', posts.id, posts.media)} />
            </div>

            <div className='w-full flex items-center justify-center p-2 prose'>
                <div className='w-full  line-clamp-4'>
                    {posts.body}
                </div>
            </div>

        </div>
    );
}




const makeUrl = (coll_name: string, coll_id: string, media: string) => {
    if (media) {
        return `${pb_url}/api/files/${coll_name}/${coll_id}/${media}`
    }
    return
}


import React from 'react'

interface PostsCardUserProps {
emp:Emp
}

export const PostsuserCard:React.FC<PostsCardUserProps> = ({emp}) => {
return (
 <div className="w-full flex items-center p-1 gap-1">
        <div className='w-14 flex items-center justify-center'>
        <img src={makeUrl('emps', emp.id, emp.avatar)}
                className="rounded-full aspect-square"
        />
        </div>
        <div className="w-full flex items-center justify-start text-lg font-serif">
         @{emp.name}
         
        </div>

 </div>
);
}
