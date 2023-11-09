"use client"

import React, { useEffect, useState } from 'react';
import { DndContext, KeyboardSensor, PointerSensor, closestCenter, useSensor, useSensors } from '@dnd-kit/core';

import DraggableItem from './DragAndDrop/DraggableItem';
import images from '@/lib/data';
import LoadingSkeleton from './LoadingSkeleton';
import DroppableArea from './DragAndDrop/DroppableArea';
import { SortableContext, arrayMove, rectSortingStrategy, sortableKeyboardCoordinates } from '@dnd-kit/sortable';

const ImageGrid = () => {
  const [items, setItems] = useState([])
  const [selectedImages, setSelectedImages] = useState([]);
  const [isDropped, setIsDropped] = useState(false)

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

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        delay: 100,
        tolerance: 5,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event) => {
    const { active, over } = event;

    console.log("dragged")

    if (active.id !== over.id) {
      setItems((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);

        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };


  useEffect(() => {
    setItems(images)
  }, [])

  if (!items.length) {
    return <LoadingSkeleton />
  }

  return (

    <div className='bg-white rounded-lg'>
      <div className='lg:py-6 md:py-4 sm:py-2 py-1 lg:px-10 md:px-8 sm:px-4 px-2 flex justify-between items-center'>
        <h2 className='md:text-2xl sm:text-xl text-base font-bold flex items-center gap-2'>
          {selectedImages.length > 0 ? (
            <>
              <input
                type="checkbox"
                className="lg:w-6 md:w-5 w-4 lg:h-6 md:h-5 h-4"
                defaultChecked
              />
              <span>
                {selectedImages.length} File{selectedImages.length > 1 ? "s" : ''} Selected
              </span>
            </>
          ) : (
            `Gallery`
          )}
        </h2>
        {selectedImages.length > 0 && (
          <span
            className="text-red-500 font-bold cursor-pointer"
            onClick={handleDeleteSelectedImages}
          >
            Delete file{selectedImages.length > 1 && "s"}
          </span>
        )}
      </div>
      <div className='h-[2px] bg-slate-300'></div>
      <DndContext onDragEnd={handleDragEnd} sensors={sensors} collisionDetection={closestCenter}>
        <SortableContext items={items} strategy={rectSortingStrategy}>
          <div className="grid lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-4 lg:p-8 md:p-6 sm:p-4 p-2 ">
            {items.map((image, index) => (
              <div key={image.id} className={`${index === 0 && 'col-span-2 row-span-2'}`}>
                <DraggableItem
                  image={image}
                  id={index}
                  isSelected={selectedImages.includes(index)}
                  onSelect={handleImageSelect}
                />
              </div>
            ))}
          </div>
        </SortableContext>
      </DndContext>
    </div>

  );
};

export default ImageGrid;