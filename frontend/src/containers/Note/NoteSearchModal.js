import React, { useRef, useState, useEffect } from "react";
import tw from "tailwind-styled-components";
import GoogleCustomSearch from "../../components/infra/GoogleCustomSearch";
import NoteNavHeader from "../../components/Note/NoteNavHeader";
import NoteImage from "../../components/Note/NoteImage";
import fileGetApi from "../../api/fileGetApi";

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

const NoteSearchModal = ({
  isSearchModalOpen,
  handleSearchModalClose,
  openImagePreview,
}) => {
  const [noteStorageVisible, setNoteStorageVisible] = useState(false);
  const [noteSearchVisible, setNoteSearchVisible] = useState(true);

  const modalRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState([]);

  const fetchImages = async () => {
    setLoading(true);
    try {
      const response = await fileGetApi();
      setImages(response); // Assuming response is an array of images
    } catch (error) {
      console.error("Error fetching images:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleContentClick = (event) => {
    event.stopPropagation();
  };

  const toggleSearchVisible = () => {
    setNoteStorageVisible(false);
    setNoteSearchVisible(true);
  };

  const toggleStorageVisible = () => {
    setNoteStorageVisible(true);
    setNoteSearchVisible(false);
  };

  useEffect(() => {
    if (noteStorageVisible) {
      fetchImages();
    }
  }, [noteStorageVisible]);

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
              <NoteNavHeader
                toggleSearchVisible={toggleSearchVisible}
                toggleStorageVisible={toggleStorageVisible}
              />
            </ModalTitle>

            <ModalCloseButton onClick={handleSearchModalClose}>
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
          {noteSearchVisible && (
            <GoogleCustomSearch
              isSearchModalOpen={isSearchModalOpen}
              handleSearchModalClose={handleSearchModalClose}
            />
          )}
          {noteStorageVisible && (
            <NoteImage
              images={images}
              loading={loading}
              openImagePreview={openImagePreview}
            />
          )}
        </ModalContent>
      </ModalContainer>
    </ModalBackground>
  );
};

export default NoteSearchModal;
