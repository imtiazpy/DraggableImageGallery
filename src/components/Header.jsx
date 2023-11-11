import React from 'react';

const Header = ({ selectedImages, handleDeleteSelectedImages }) => {
  return (
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
  );
};

export default Header;