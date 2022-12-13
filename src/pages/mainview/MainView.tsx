import React from 'react'
import { Channels } from '../../components/mainview/Channels';
import { Members } from '../../components/mainview/Members';
import { Posts } from '../../components/mainview/Posts';
import { User } from '../../utils/types';

interface MianViewProps {
    user?: User
}

export const MainView: React.FC<MianViewProps> = ({user}) => {
return (
 <div className='w-full h-full flex items-center justify-between'>
        <div className='min-w-[20%] py-5 h-full flex flex-col justify-start items-center 
        bg-slate-200 dark:bg-slate-700 overflow-scroll'>
        <Channels user={user}/>
       
        </div>
        <div className='w-full h-full flex flex-col items-center '>
         <Posts user={user}/>
        </div>
        <div className='min-w-[20%] py-5 h-full flex flex-col justify-start items-center 
        bg-slate-200 dark:bg-slate-700 overflow-scroll'>
         <Members user={user} />
        </div>
 </div>
);
}
