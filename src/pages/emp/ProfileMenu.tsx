import React from 'react'
import { Record, Admin } from 'pocketbase';
import { useQueryClient } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { client } from './../../pb/config';

import {
    BsSunFill,
    BsFillMoonFill,
} from "react-icons/bs";
import { useTheme } from '../../shared/hooks/themeHook';
import { TheIcon } from './../../shared/extra/TheIcon';
interface ProfileMenuProps {
    user: Record | Admin | null | undefined
    avatar: string
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export const ProfileMenu: React.FC<ProfileMenuProps> = ({ user, avatar, setOpen }) => {
    const queryClient = useQueryClient();
    const theme = useTheme();
    const nextTheme = theme.theme === "dark" ? "light" : "dark";
    const mode = theme.theme === "dark" ? BsSunFill: BsFillMoonFill;
    const toggle = () => { theme.setTheme(nextTheme) };
    const logout = () => {
        client.authStore.clear();
        queryClient.invalidateQueries(["user"]);
        setOpen(prev => !prev)
    };

    return (
        <div className=' h-fit w-full min-h-[80%] p-2  dark:bg-slate-900 bg-slate-300 
        dark:text-slate-100 border rounded-md bg-opacity-100 text-xl
           shadow shadow-slate-300 flex flex-col justify-center items-center gap-5'>

            <div className='w-full h-fit flex flex-col justify-center items-center p-2 '>
         
            </div>
            <div className='w-full h-fit flex flex-col justify-center items-center'>
                <img
                    src={avatar}
                    alt={""}
                    className="rounded-full hover:rounded-md min-h-[100px] max-h-[300px] aspect-square 
                    border-2 border-slate-900 dark:border-slate-100
                "
                />
            </div>
            <div className='w-full h-fit flex flex-col justify-center items-center p-2'>
                <Link to={'/profile'}
                    onClick={() => setOpen(prev => !prev)}
                    className="border-b hover:text-blue-500 
                    border-b-slate-900 dark:border-b-slate-100
                    ">Edit profile</Link>
            </div>
            <div className='w-full h-fit flex flex-col justify-center items-center p-2'>
                <button
                    onClick={() => logout()}
                    className='p-2 text-sm font-semibold rounded-lg
                    
                    border border-slate-900 dark:border-slate-100
                   hover:scale-110 hover:bg-slate-700 hover:text-slate-100'
                >Sign out</button>
            </div>
            <div className="w-fit p-1 mx-5 flex justify-center items-center   ">
                <TheIcon
                    Icon={mode}
                    size={"25"}
                    color={""}
                    iconstyle={""}
                    iconAction={toggle}
                />
            </div>

        </div>
    );
}
