import GlobalContext from '@/context/GlobalContext';
import React, { useContext } from 'react';

const Header = () => {

  const gContext = useContext(GlobalContext);

  return (
    <div className='lg:py-6 md:py-4 sm:py-2 py-1 lg:px-10 md:px-8 sm:px-4 px-2 flex justify-between items-center'>
      <h2 className='md:text-2xl sm:text-xl text-base font-bold flex items-center gap-2'>
        {gContext.selectedImages.length > 0 ? (
          <>
            <input
              type="checkbox"
              className="lg:w-6 md:w-5 w-4 lg:h-6 md:h-5 h-4"
              defaultChecked
            />
            <span>
              {gContext.selectedImages.length} File{gContext.selectedImages.length > 1 ? "s" : ''} Selected
            </span>
          </>
        ) : (
          `Gallery`
        )}
      </h2>
      {gContext.selectedImages.length > 0 && (
        <span
          className="text-red-500 font-bold cursor-pointer"
          onClick={gContext.handleDeleteSelectedImages}
        >
          Delete file{gContext.selectedImages.length > 1 && "s"}
        </span>
      )}
    </div>
  );
};

export default Header;