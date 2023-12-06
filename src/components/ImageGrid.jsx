"use client"

import React, { useContext } from 'react';
import LoadingSkeleton from './LoadingSkeleton';
import Header from './Header';
import SortableDropArea from './DragAndDrop/SortableDropArea';
import GlobalContext from '@/context/GlobalContext';

const ImageGrid = () => {


  const gContext = useContext(GlobalContext);

  if (!gContext?.items.length) {
    return <LoadingSkeleton />
  }

  return (
    <div className='bg-white rounded-lg'>
      <Header />
      <div className='h-[2px] bg-slate-300'></div>
      <SortableDropArea />
    </div>
  );
};

export default ImageGrid;