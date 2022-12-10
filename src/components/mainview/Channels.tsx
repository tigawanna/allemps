import React from 'react'
import { QueryStateWrapper } from '../../shared/extra/QueryStateWrapper';
import { useQuery } from '@tanstack/react-query';
import { getRecords, PBChannels } from './../../api/pb';
import { RiArrowDropDownLine } from 'react-icons/ri'
import { TheIcon } from '../../shared/extra/TheIcon';
import { FaPlus } from 'react-icons/fa';

interface ChannelsProps {

}

export const Channels: React.FC<ChannelsProps> = ({}) => {
const cahhnels_url = "https://emps.tigawanna.tech/api/collections/channels/records"
const [show,setShow] = React.useState(true)
const query = useQuery(['channels'],()=>getRecords(cahhnels_url))
const data = query?.data as PBChannels
const channels = data?.items
console.log("data === ",data)
return (
<div className='w-full flex flex-col items-center justify-center p-2'>
<div className='w-full flex flex-col items-center justify-center rounded p-2 
border  border-slate-700 dark:border-slate-300'>
<div className='w-[95%] flex items-center p-2'>
  
 <div className='w-[95%] flex items-center justify-center font-bold text-xl p-2'>
    Channels
</div>
 <TheIcon Icon={FaPlus} iconAction={() => setShow(prev => !prev)} />
<TheIcon Icon={RiArrowDropDownLine} iconAction={() => setShow(prev => !prev)} size='30'/>

</div>
<QueryStateWrapper
error={query.error}
isError={query.isError}
isLoading={query.isLoading}
>
<div className='w-full flex flex-col items-center justify-center'>
{ show&&channels?.map((channel,index)=>{
    return(
        <div key={channel.id} className='w-[80%] p-1 hover:bg-slate-300 dark:hover:bg-slate-800
        flex items-center justify-center text-sm border-b dark:border-b-[1px]
         border-slate-600 dark:border-slate-300 shadow-lg dark:shadow-slate-600 rounded'>
          #{channel.name}
        </div>
    )
})
}
</div>
</QueryStateWrapper>

</div>
</div>
);
}
