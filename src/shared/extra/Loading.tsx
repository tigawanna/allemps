import React from 'react'
import { LoaderElipse } from './../loaders/Loaders';

interface LoadingProps {
size:number
}

export const Loading: React.FC<LoadingProps> = ({size}) => {

return (
  <div className="flex justify-center items-center h-full">
    <LoaderElipse/>
  </div>
);
}
