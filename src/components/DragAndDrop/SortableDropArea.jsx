import React, { useRef } from 'react';
import { DndContext, KeyboardSensor, PointerSensor, TouchSensor, closestCenter, useSensor, useSensors } from '@dnd-kit/core';
import { SortableContext, rectSortingStrategy, sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import DraggableItem from './DraggableItem';
import UploadNew from '../UploadNew';

const SortableDropArea = ({ items, handleDragEnd, selectedImages, handleImageSelect, handleUploadImage }) => {

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        delay: 20,
        tolerance: 5,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 250,
        tolerance: 5,
      },
    })
  );

  return (
    <DndContext onDragEnd={handleDragEnd} sensors={sensors} collisionDetection={closestCenter}>
      <SortableContext items={items} strategy={rectSortingStrategy}>
        <div className="grid lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-4 lg:p-8 md:p-6 sm:p-4 p-2 ">
          {items.map((image, index) => (
            <div
              key={image.id}
              className={`${index === 0 && 'col-span-2 row-span-2'} border border-slate-400 rounded-lg p-[0.1px]`}
            >
              <DraggableItem
                image={image}
                index={index}
                isSelected={selectedImages.includes(index)}
                onSelect={handleImageSelect}
              />
            </div>
          ))}
          <UploadNew handleUploadImage={handleUploadImage} />
        </div>
      </SortableContext>
    </DndContext>
  );
};

export default SortableDropArea;