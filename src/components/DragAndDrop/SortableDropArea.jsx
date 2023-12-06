import React, { useContext } from 'react';
import { DndContext, DragOverlay, KeyboardSensor, PointerSensor, TouchSensor, closestCenter, defaultDropAnimationSideEffects, useSensor, useSensors } from '@dnd-kit/core';
import { SortableContext, rectSortingStrategy, sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import DraggableItem from './DraggableItem';
import UploadNew from '../UploadNew';
import { createPortal } from 'react-dom';
import GlobalContext from '@/context/GlobalContext';

const SortableDropArea = () => {

  const gContext = useContext(GlobalContext);

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

  const getActiveValue = () => {
    const res = gContext.items.find((item) => item.id === gContext.activeId);
    return res;
  };

  const dropAnimation = {
    sideEffects: defaultDropAnimationSideEffects({
      styles: {
        active: {
          opacity: "0.5",
        },
      },
    }),
  };

  return (
    <DndContext
      onDragStart={({ active }) => {
        if (!active) {
          return;
        }
        gContext.setActiveId(active.id)
      }}
      onDragEnd={gContext.handleDragEnd}
      sensors={sensors}
      collisionDetection={closestCenter}
    >
      <SortableContext items={gContext.items} strategy={rectSortingStrategy}>
        <div className="grid lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-4 lg:p-8 md:p-6 sm:p-4 p-2 ">
          {gContext.items.map((image, index) => (
            <div
              key={image.id}
              className={`${index === 0 && 'col-span-2 row-span-2'} border border-slate-400 rounded-lg p-[0.1px]`}
            >
              <DraggableItem image={image} />
            </div>
          ))}
          <UploadNew />
        </div>
      </SortableContext>
      {createPortal(
        <DragOverlay adjustScale={true} dropAnimation={dropAnimation}>
          {gContext.activeId ? (
            <DraggableItem
              image={getActiveValue()}
            />
          ) : null}
        </DragOverlay>,
        document.body
      )}
    </DndContext>
  );
};

export default SortableDropArea;