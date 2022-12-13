
import { FaPlus, FaExternalLinkAlt } from "react-icons/fa";
import { ChannelItem } from "../../api/pb-api-types";
import { TheIcon } from "../../shared/extra/TheIcon";
import { User } from '../../utils/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { client } from './../../pb/config';
import { ReactModalWrapper } from './../../shared/extra/ReactModalWrapper';
import React from 'react'
import { concatErrors } from "../../utils/utils";
import { Link } from 'react-router-dom';



interface ChannelProps {
    channel: ChannelItem
    user: User | undefined
    curr_channel: string | undefined
 
}

export const Channel: React.FC<ChannelProps> = ({ channel, user,curr_channel }) => {
    const [isOpen, setIsOpen] = React.useState(false);


    return (
    
        <div className='w-full p-1 hover:bg-slate-300 dark:hover:bg-slate-800
        flex items-center justify-between text-[13px] border-b dark:border-b-[1px] 
         border-slate-600 dark:border-slate-300 shadow-lg dark:shadow-slate-600 rounded'>
            <ReactModalWrapper
                isOpen={isOpen}
                closeModal={() => setIsOpen(false)}
                child={<JoinChannel channel={channel} user={user}/>}
                styles={{ content_top: "5%", }}
            />
        <Link to={'/main/' + channel.id}>
        <div 
        style={{ backgroundColor: curr_channel === channel.id ?"#452870":""}}
        className='w-full px-2 hover:bg-slate-300 dark:hover:bg-slate-800
        flex items-center justify-center text-[13px] border-b dark:border-b-[1px] rounded-2xl
         border-slate-600 dark:border-slate-300 shadow-lg dark:shadow-slate-600 '>
        #{channel.name}
        
        </div>
    </Link>
            <TheIcon Icon={FaExternalLinkAlt} iconAction={() => setIsOpen(prev => !prev)} />
        </div>

    );
}



interface JoinChannelProps {
    channel: ChannelItem
    user: User | undefined
}

export const JoinChannel: React.FC<JoinChannelProps> = ({channel,user}) => {
   const [error,setError]=React.useState("")
    const mutation = useMutation(async () => {
        setError("")
        try {
            const data = {
                "channel": channel.id,
                "emp": user?.id
            };
            return await client.collection('members').create(data);
        }
        catch (e) {
            setError(concatErrors(e))
            throw e
        }
    })
return (
 <div className="bg-slate-800 w-full h-full flex flex-col items-center justify-center">
     <div 
    // style={{ backgroundColor: channel.color }}
     className=" w-[50%]  rounded-full aspect-square flex items-center justify-center p-3">
            <button
               
                className="p-5 bg-slate-600 text-2xl font-bold hover:text-slate-50 rounded-lg
                 hover:scale-105"
                onClick={() => mutation.mutate()}>
                Join Channel
            </button>
     </div>

        <div
            style={{ backgroundColor: channel.color }}
            className=" w-[50%] h-3   aspect-square flex items-center justify-center p-3">
        </div>
        <div
           className="  flex items-center justify-center p-3">
            {error}
        </div>
 </div>
);
}
