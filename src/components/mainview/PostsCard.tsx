import { PostsItem } from "../../api/pb-api-types";
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
            <div className='w-full flex items-center text-xl font-bold'>
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
