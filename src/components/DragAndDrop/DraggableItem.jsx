import React, { useContext, useState } from 'react';
import Image from 'next/image';

import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import GlobalContext from '@/context/GlobalContext';


const DraggableItem = ({ image }) => {
  const [isCheckBoxFocused, setIsCheckBoxFocused] = useState(false);

  const gContext = useContext(GlobalContext);

  const isSelected = gContext.selectedImages.includes(image.id)

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
    gContext.handleImageSelect(image.id)
  }

  return (
    <div
      ref={setNodeRef}
      style={{ touchAction: "pan-y", ...style }}
      {...listeners}
      {...attributes}
      className={`relative rounded-md overflow-hidden img-wrapper border border-slate-400`}
    >
      <div className={`absolute inset-0 ${isSelected ? 'bg-slate-300' : 'bg-black'} opacity-0 transition-opacity duration-300 hover:opacity-50 ${isSelected || isCheckBoxFocused ? 'opacity-50' : ''} shade`}></div>
      <input
        type="checkbox"
        className="absolute lg:top-5 md:top-4 sm:top-3 top-2 lg:left-5 md:left-4 sm:left-3 left-2 opacity-0 checkbox lg:w-6 md:w-5 w-5 lg:h-6 md:h-5 h-5 cursor-pointer"
        checked={isSelected}
        onChange={() => handleSelect()}
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
          WebkitTouchCallout: "none",
          WebkitUserSelect: "none",
          objectFit: "cover",
          opacity: image.id === gContext.activeId ? 0.3 : 1,
        }}
      />
    </div>
  );
};

export default DraggableItem;