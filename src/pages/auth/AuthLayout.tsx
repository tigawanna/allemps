import React from 'react'
import { Outlet} from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { User } from '../../utils/types';

interface AuthLayoutProps {
    user?: User | null
}

export const AuthLayout: React.FC<AuthLayoutProps> = ({user}) => {
    const navigate = useNavigate()
    // console.log("user ===",user)
    useEffect(() => {
        if (user) {
            if (user?.email && (user?.bio === "" || user?.avatar === "")) {
                navigate('/profile')
            }
            else {
                navigate('/')
            }
        }

    }, [user])


return (
<div className='w-full h-full'>
   <Outlet />
</div>
);
}
