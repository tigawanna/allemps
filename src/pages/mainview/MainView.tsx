import React from 'react'
import { FaUsers,FaBars } from 'react-icons/fa';
import { RiArrowDropDownLine } from 'react-icons/ri';
import { Channels } from '../../components/mainview/Channels';
import { Members } from '../../components/mainview/Members';
import { Posts } from '../../components/mainview/Posts';
import { TheIcon } from '../../shared/extra/TheIcon';
import { User } from '../../utils/types';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getRecords } from '../../api/pb';
import { getChannelUrl } from './../../api/pb';
import { QueryStateWrapper } from './../../shared/extra/QueryStateWrapper';
import { PBChannels } from './../../api/pb-api-types';

interface MianViewProps {
    user?: User
}
export type MainViewParamsT = {
    channel_id: string
}
export const MainView: React.FC<MianViewProps> = ({user}) => {
const params = useParams<MainViewParamsT>()
const channel_id = params.channel_id ?? "0ds0fovs0nsas0k"
const query = useQuery<PBChannels, unknown, PBChannels, string[]>(['channels', channel_id], () => getRecords(getChannelUrl(channel_id)))

const [showCHannels, setShowChannels] = React.useState(true)
const [showMembers, setShowMembers] = React.useState(true)

const curr_channel = query.data?.items[0]

return (
 <div className='w-full h-full flex flex-col md:flex-row items-center justify-between'>
<div
style={{backgroundColor:curr_channel?.color}} 
className='w-full flex md:hidden  items-center justify-between p-1'>
<TheIcon Icon={FaBars} iconAction={() => setShowChannels(prev => !prev)} size='30' />
<QueryStateWrapper
error={query.error}
isError={query.isError}
isLoading={query.isLoading}>  
<div
className='w-full flex items-center justify-center font-bold text-xl '>
{curr_channel?.name}
</div>
</QueryStateWrapper>
<TheIcon Icon={FaUsers} iconAction={() => setShowMembers(prev => !prev)} size='30' />
</div>
<div className='min-w-[20%] py-5 h-full hidden md:flex md:flex-col md:justify-start md:items-center 
        bg-slate-200 dark:bg-slate-700 overflow-scroll'>
<Channels user={user} params={params} current_channel={curr_channel}/>
</div>

 <div className='w-full h-[95%] flex flex-col items-center '>
            <Posts user={user} params={params} current_channel={curr_channel} />
</div>

        <div className='min-w-[20%] py-5 h-full hidden md:flex flex-col justify-start items-center 
        bg-slate-200 dark:bg-slate-700 overflow-scroll'>
            <Members user={user} params={params} current_channel={curr_channel} />
        </div>



 </div>
);
}
