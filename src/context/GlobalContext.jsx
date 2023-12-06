import images from "@/lib/data";
import { arrayMove } from "@dnd-kit/sortable";

const { createContext, useState, useEffect } = require("react");


const GlobalContext = createContext();

const GlobalProvider = ({ children }) => {
  const [items, setItems] = useState([])
  const [selectedImages, setSelectedImages] = useState([]);
  const [activeId, setActiveId] = useState(null)

  // Image select
  const handleImageSelect = (id) => {
    const updatedSelection = [...selectedImages];
    if (updatedSelection.includes(id)) {
      updatedSelection.splice(updatedSelection.indexOf(id), 1);
    } else {
      updatedSelection.push(id);
    }
    setSelectedImages(updatedSelection);
  };


  // Image Delete
  const handleDeleteSelectedImages = () => {
    const updatedImages = items.filter((item, index) => !selectedImages.includes(item.id));
    setSelectedImages([]);
    setItems(updatedImages)
  };


  // Image upload
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
    if (active?.id !== over?.id) {
      setItems((items) => {
        const oldIndex = items.findIndex((item) => item.id === active?.id);
        const newIndex = items.findIndex((item) => item.id === over?.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
    setActiveId(null)
  };


  useEffect(() => {
    setItems(images);
  }, [])


  return (
    <GlobalContext.Provider
      value={{
        items,
        activeId,
        setActiveId,
        selectedImages,
        handleImageSelect,
        handleDeleteSelectedImages,
        handleUploadImage,
        handleDragEnd,
      }}
    >
      {children}
    </GlobalContext.Provider>
  )
};

export default GlobalContext;
export { GlobalProvider };