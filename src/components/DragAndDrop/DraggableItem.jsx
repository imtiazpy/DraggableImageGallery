import React, { useState } from 'react';
import Image from 'next/image';

import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';


const DraggableItem = ({ image, index, isSelected, onSelect }) => {
  const [isCheckBoxFocused, setIsCheckBoxFocused] = useState(false);

  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id: image.id,
    transition: {
      duration: 800,
      easing: 'ease',
    }
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const handleSelect = () => {
    onSelect(index);
  }

  return (
    <div
      ref={setNodeRef}
      style={{ touchAction: "none", ...style }}
      {...listeners}
      {...attributes}
      className={`relative rounded-lg overflow-hidden img-wrapper border border-slate-400`}
    >
      <div className={`absolute inset-0 ${isSelected ? 'bg-slate-300' : 'bg-black'} opacity-0 transition-opacity duration-300 hover:opacity-50 ${isSelected || isCheckBoxFocused ? 'opacity-50' : ''} shade`}></div>
      <input
        type="checkbox"
        className="absolute lg:top-5 md:top-4 sm:top-3 top-2 lg:left-5 md:left-4 sm:left-3 left-2 opacity-0 checkbox lg:w-6 md:w-5 w-4 lg:h-6 md:h-5 h-4 cursor-pointer"
        checked={isSelected}
        onChange={handleSelect}
        onMouseEnter={() => setIsCheckBoxFocused(true)}
        onMouseLeave={() => setIsCheckBoxFocused(false)}
      />
      <Image
        width={500}
        height={500}
        priority
        src={image.src}
        alt={image.alt}
        style={{
          // WebkitTouchCallout: "none",
          // WebkitUserSelect: "none",
          objectFit: "cover"
        }}
      />
    </div>
  );
};

export default DraggableItem;