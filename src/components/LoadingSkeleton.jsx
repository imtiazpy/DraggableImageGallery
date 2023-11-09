import React from 'react';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

function Box({ children }) {
  return (
    <div className='border border-[#ccc] p-2'>
      {children}
    </div>
  );
}


const LoadingSkeleton = () => {
  return (
    <div className='bg-white rounded-lg'>
      <div className='py-4 px-8 flex justify-between items-center'>
        <h2 className='text-2xl font-bold'>Gallery</h2>
      </div>
      <div className='h-[2px] bg-slate-300'></div>
      <div className="grid lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-4 p-8 ">

        <div className='col-span-2 row-span-2 h-full'>
          <Skeleton wrapper={Box} count={1} height={192} />
        </div>
        {Array.from({ length: 10 }).map((_, index) => (
          <div key={index}>
            <Skeleton wrapper={Box} count={1} height={192} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default LoadingSkeleton;