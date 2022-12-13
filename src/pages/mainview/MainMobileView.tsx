import React from 'react'
import { FaPlus } from 'react-icons/fa';
import { RiArrowDropDownLine } from 'react-icons/ri';
import { Channels } from '../../components/mainview/Channels';
import { Members } from '../../components/mainview/Members';
import { Posts } from '../../components/mainview/Posts';
import { TheIcon } from '../../shared/extra/TheIcon';
import { User } from '../../utils/types';

interface MianViewProps {
    user?: User
}

export const MainMobileView: React.FC<MianViewProps> = ({user}) => {
    
    const [showCHannels, setShowChannels] = React.useState(true)
    const [showMembers, setShowMembers] = React.useState(true)
return (
 <div className='w-full h-full flex flex-col md:flex-row items-center justify-between'>
{/* 
        <div className='min-w-[20%] py-5 h-full hidden md:flex md:flex-col md:justify-start md:items-center 
        bg-slate-200 dark:bg-slate-700 overflow-scroll'>
        <Channels user={user}/>
        </div> */}

        <div className='w-full h-full flex flex-col items-center '>
         <Posts user={user}/>
        </div>
{/* 
        <div className='min-w-[20%] py-5 h-full hidden md:flex flex-col justify-start items-center 
        bg-slate-200 dark:bg-slate-700 overflow-scroll'>
         <Members user={user} />
        </div> */}

        <div className='w-full bg-red-700 flex md:hidden  items-center justify-between px-6'>
            <TheIcon Icon={RiArrowDropDownLine} iconAction={() => setShowChannels(prev => !prev)} size='60' />
            <TheIcon Icon={RiArrowDropDownLine} iconAction={() => setShowMembers(prev => !prev)} size='60' />
        </div>

 </div>
);
}
