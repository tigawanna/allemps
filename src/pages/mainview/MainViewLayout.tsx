import React from 'react'
import { Outlet } from 'react-router-dom';
import { User } from '../../utils/types';

interface MainViewLayoutProps {
user?:User
}

export const MainViewLayout: React.FC<MainViewLayoutProps> = ({}) => {
return (
    <div className='w-full h-full'>
        <Outlet />
    </div>
);
}
