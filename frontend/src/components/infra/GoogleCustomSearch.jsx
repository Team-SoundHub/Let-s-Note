import React, { useState, useRef } from "react";
import { TextInput } from "flowbite-react";
import tw from "tailwind-styled-components";
import Button from "../common/Button";
import { googleCustomSearchApi } from "../../api/googleCustomSearchApi";
import SearchImageModal from "../WorkSpace/SearchImageModal";
import FileStoreModal from "../WorkSpace/FileStoreModal";

const ModalBackground = tw.div`
  fixed
  inset-0
  bg-black/50
  z-20
`;

const ModalContainer = tw.div`
  fixed
  overflow-y-auto
  overflow-x-hidden
  flex
  z-50
  justify-center
  w-full
  md:inset-0
  h-[calc(100%-1rem)]
  max-h-full
`;

const ModalContent = tw.div`
  fixed
  bottom-0
  left-0
  right-0
  z-40
  w-full
  p-4
  overflow-y-auto
  transition-transform
  bg-white
  dark:bg-gray-800
  transform-none
  tabindex="-1"
`;

const ModalHeader = tw.div`
  flex
  items-center
  justify-between
  p-4
  md:p-5
  border-b
  rounded-t
  dark:border-gray-600
`;

const ModalTitle = tw.h3`
  text-xl
  font-semibold
  text-gray-900
  dark:text-white
`;

const ModalCloseButton = tw.button`
  end-2.5
  text-gray-400
  bg-transparent
  hover:bg-gray-200
  hover:text-gray-900
  rounded-lg
  text-sm
  w-8
  h-8
  ms-auto
  inline-flex
  justify-center
  items-center
  dark:hover:bg-gray-600
  dark:hover:text-white
`;

const ModalBody = tw.div`
relative
  flex
  p-4
  md:p-5
  overflow-x-auto
`;

const HoverZoomedImage = tw.img`
  fixed
  top-1/2
  left-1/2
  transform
  -translate-x-1/2
  -translate-y-1/2
  transition-transform
  cursor-pointer
  z-50
`;

const GoogleCustomSearch = ({ searchBoxVisible, handleSearchBarClose }) => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [storedImage, setStoredImage] = useState(null);
  const [hoveredImage, setHoveredImage] = useState(null);
  const modalRef = useRef(null);

  const handleSearchClick = async () => {
    try {
      setLoading(true);
      const searchTerm = document.getElementById("input-info").value;
      document.getElementById("input-info").value = "";
      const fetchedImages = await googleCustomSearchApi(searchTerm);

      if (fetchedImages && fetchedImages.length >= 1) {
        setImages(fetchedImages);
      } else {
        setImages([]); // Reset images state if no images are found
      }
    } catch (error) {
      console.error("Error during search:", error);
    } finally {
      setLoading(false);
    }
  };

  const openImageModal = (imageUrl) => {
    setSelectedImage(imageUrl);
  };

  const openFileStoreModal = (imageUrl) => {
    setStoredImage(imageUrl);
  };

  const handleContentClick = (event) => {
    event.stopPropagation();
  };

  const handleImageHover = (imageUrl) => {
    setHoveredImage(imageUrl);
  };

  const handleImageLeave = () => {
    setHoveredImage(null);
  };

  return (
    <ModalBackground>
      <ModalContainer
        id="authentication-modal"
        tabIndex="-1"
        aria-hidden="true"
      >
        <ModalContent ref={modalRef} onClick={handleContentClick}>
          <ModalHeader>
            <ModalTitle>
              <TextInput
                id="input-info"
                placeholder="노래 이름 입력"
                required
                color="info"
              />
            </ModalTitle>
            <Button onClick={handleSearchClick} disabled={loading}>
              악보 검색
            </Button>
            <ModalCloseButton onClick={handleSearchBarClose}>
              {" "}
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                ></path>
              </svg>
              <span className="sr-only">Close modal</span>
            </ModalCloseButton>
          </ModalHeader>
          <ModalBody>
            {loading && <p>Loading...</p>}
            {!loading && images.length === 0 && <p>No images found.</p>}
            {!loading && images.length > 0 && (
              <ul className="flex">
                {images.map((image, index) => (
                  <li
                    key={index}
                    className="mr-4 w-60 h-40 cursor-pointer relative"
                    onMouseEnter={() => handleImageHover(image.imageUrl)}
                    onMouseLeave={handleImageLeave}
                  >
                    <div>
                      <img
                        className="z-10"
                        src={image.imageUrl}
                        width={250}
                        height={200}
                        alt={image.title}
                        onClick={() => openImageModal(image.imageUrl)}
                        draggable="true"
                      />
                      <p className={"overflow-ellipsis"}>{image.title}</p>
                      {/* <Button
                        onClick={() => openFileStoreModal(image.imageUrl)}
                        disabled={loading}
                      >
                        악보에 저장
                      </Button> */}
                    </div>
                    {hoveredImage === image.imageUrl && (
                      <HoverZoomedImage
                        src={image.imageUrl}
                        width={400}
                        height={320}
                        alt={image.title}
                        onClick={() => openImageModal(image.imageUrl)}
                      />
                    )}
                  </li>
                ))}
              </ul>
            )}
          </ModalBody>
          {selectedImage && (
            <SearchImageModal
              image_url={selectedImage}
              onClose={() => setSelectedImage(null)}
              openFileStoreModal={openFileStoreModal}
            />
          )}
          {storedImage && (
            <FileStoreModal
              image_url={storedImage}
              onClose={() => setStoredImage(null)}
            />
          )}
        </ModalContent>
      </ModalContainer>
    </ModalBackground>
  );
};

export default GoogleCustomSearch;
