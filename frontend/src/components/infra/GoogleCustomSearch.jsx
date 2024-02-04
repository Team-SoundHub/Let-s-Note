import React, { useState } from "react";
import { TextInput } from "flowbite-react";
import tw from "tailwind-styled-components";
import Button from "../common/Button";
import { googleCustomSearchApi } from "../../api/googleCustomSearchApi";
import SearchImageModal from "../WorkSpace/SearchImageModal";
import FileStoreModal from "../WorkSpace/FileStoreModal";

const ModalContainer = tw.div`
  fixed
  overflow-y-auto
  overflow-x-hidden
  flex
  z-50
  justify-center
  items-center
  w-full
  md:inset-0
  h-[calc(100%-1rem)]
  max-h-full
`;

const ModalContent = tw.div`
  relative
  p-4
  w-full
  max-w-md
  max-h-full
  bg-white
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
  p-4
  md:p-5
  overflow-x-auto
`;

const GoogleCustomSearch = ({ handleSearchBarClose }) => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [storedImage, setStoredImage] = useState(null);

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

  return (
    <ModalContainer id="authentication-modal" tabIndex="-1" aria-hidden="true">
      <ModalContent onClick={handleContentClick}>
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
                <li key={index} className="mr-4 w-60 cursor-pointer">
                  <div>
                    <img
                      src={image.imageUrl}
                      width={250}
                      height={200}
                      alt={image.title}
                      onClick={() => openImageModal(image.imageUrl)}
                      draggable="true"
                    />
                    <p className={"overflow-ellipsis"}>{image.title}</p>
                    <Button
                      onClick={() => openFileStoreModal(image.imageUrl)}
                      disabled={loading}
                    >
                      악보에 저장
                    </Button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </ModalBody>
        {selectedImage && (
          <SearchImageModal
            image_url={selectedImage}
            onClose={() => setSelectedImage(null)}
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
  );
};

export default GoogleCustomSearch;
