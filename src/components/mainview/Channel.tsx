
import { FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";
import { ChannelItem } from "../../api/pb-api-types";
import { TheIcon } from "../../shared/extra/TheIcon";
import { User } from '../../utils/types';

interface ChannelProps {
    channel: ChannelItem
    user: User | undefined
}

export const Channel: React.FC<ChannelProps> = ({ channel, user }) => {

    return (
        <div className='w-full p-1 hover:bg-slate-300 dark:hover:bg-slate-800
        flex items-center justify-between text-[13px] border-b dark:border-b-[1px] 
         border-slate-600 dark:border-slate-300 shadow-lg dark:shadow-slate-600 rounded'>
            <Link to={'/main/' + channel.id} key={channel.id}>
                <div className='w-full p-1 hover:bg-slate-300 dark:hover:bg-slate-800
        flex items-center justify-center text-[13px] border-b dark:border-b-[1px] 
         border-slate-600 dark:border-slate-300 shadow-lg dark:shadow-slate-600 rounded'>
                    #{channel.name}
                </div>
            </Link>
            <TheIcon Icon={FaPlus} />
        </div>
    );
}
