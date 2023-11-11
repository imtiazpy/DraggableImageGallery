"use client"

import React, { useEffect, useState } from 'react';
import images from '@/lib/data';
import LoadingSkeleton from './LoadingSkeleton';
import { arrayMove } from '@dnd-kit/sortable';
import Header from './Header';
import SortableDropArea from './DragAndDrop/SortableDropArea';

const ImageGrid = () => {
  const [items, setItems] = useState([])
  const [selectedImages, setSelectedImages] = useState([]);


  const handleImageSelect = (index) => {
    const updatedSelection = [...selectedImages];
    if (updatedSelection.includes(index)) {
      updatedSelection.splice(updatedSelection.indexOf(index), 1);
    } else {
      updatedSelection.push(index);
    }
    setSelectedImages(updatedSelection);
  };

  const handleDeleteSelectedImages = () => {
    const updatedImages = items.filter((_, index) => !selectedImages.includes(index));
    setSelectedImages([]);
    setItems(updatedImages)
  };

  const handleUploadImage = (e) => {
    const newItems = [...items];
    const files = e.target.files;

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const newItem = {
        id: Date.now() + i,
        src: URL.createObjectURL(file),
        alt: `New Image ${i + 1}`,
      };
      newItems.push(newItem);
    }
    setItems(newItems);
  };



  const handleDragEnd = (event) => {
    const { active, over } = event;

    console.log("Dragged")

    if (active?.id !== over?.id) {
      setItems((items) => {
        const oldIndex = items.findIndex((item) => item.id === active?.id);
        const newIndex = items.findIndex((item) => item.id === over?.id);

        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };


  useEffect(() => {
    setItems(images);
  }, []);

  if (!items.length) {
    return <LoadingSkeleton />
  }

  return (

    <div className='bg-white rounded-lg'>
      <Header selectedImages={selectedImages} handleDeleteSelectedImages={handleDeleteSelectedImages} />
      <div className='h-[2px] bg-slate-300'></div>
      <SortableDropArea
        items={items}
        handleDragEnd={handleDragEnd}
        selectedImages={selectedImages}
        handleImageSelect={handleImageSelect}
        handleUploadImage={handleUploadImage}
      />

    </div>

  );
};

export default ImageGrid;