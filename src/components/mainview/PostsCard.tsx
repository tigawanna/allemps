import { Emp, PostsItem } from "../../api/pb-api-types";

interface PostsCardProps {
    posts: PostsItem
}

export const PostsCard: React.FC<PostsCardProps> = ({ posts }) => {
    return (
        <div key={posts.id}
            className='w-[98%] flex flex-col items-center p-2
           border border-slate-700 dark:border-slate-100 rounded-lg '>
            <PostsuserCard emp={posts.expand.emp}/>
            <div className='w-full flex items-center text-xl font-bold p-1'>
                {posts.title}
            </div>

            <div className='w-full md:w-[60%] flex items-center justify-center p-2'>
                <img src={makeUrl('posts', posts.id, posts.media)} />
            </div>

            <div className='w-full flex items-center justify-center p-2 '>
                <div className='w-full  line-clamp-4 prose dark:prose-invert'>
                    {posts.body}
                </div>
            </div>

        </div>
    );
}







import React from 'react'
import { makeUrl } from './../../pb/config';

interface PostsCardUserProps {
emp:Emp
}

export const PostsuserCard:React.FC<PostsCardUserProps> = ({emp}) => {
return (
 <div className="w-full flex items-center p-1 gap-1">
        <div className='w-14 h-14 flex items-center justify-center aspect-square'>
        <img src={makeUrl('emps', emp.id, emp.avatar)}
                className="rounded-full aspect-square w-14 h-14 "/>
        </div>
        <div className="w-full flex items-center justify-start text-lg font-serif">
         @{emp.name}
         
        </div>

 </div>
);
}
