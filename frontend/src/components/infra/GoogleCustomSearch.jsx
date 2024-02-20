import React, { useState, useRef } from "react";
import { TextInput } from "flowbite-react";
import tw from "tailwind-styled-components";
import Button from "../common/Button";
import { googleCustomSearchApi } from "../../api/googleCustomSearchApi";
import SearchImageModal from "../Note/SearchImageModal";
import FileStoreModal from "../Note/FileStoreModal";

const ModalBody = tw.div`
  relative
  flex
  flex-col
  p-4
  md:p-5
`;

const SearchContainer = tw.div`
  flex
  flex-row
  items-center
  justify-start
`;

const ResultContainer = tw.div`
  flex
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

const GoogleCustomSearch = ({ isSearchModalOpen, handleSearchModalClose }) => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [storedImage, setStoredImage] = useState(null);
  const [hoveredImage, setHoveredImage] = useState(null);

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

  const handleImageHover = (imageUrl) => {
    setHoveredImage(imageUrl);
  };

  const handleImageLeave = () => {
    setHoveredImage(null);
  };

  const closeFileSearchModals = () => {
    setSelectedImage(null);
    setStoredImage(null);
  }

  return (
    <ModalBody>
      <SearchContainer>
        <TextInput
          id="input-info"
          placeholder="원하는 노래를 검색하세요"
          className="w-[30%]"
          required
          color="info"
        />
        <Button className="ml-4" onClick={handleSearchClick} disabled={loading}>
          악보 검색
        </Button>
      </SearchContainer>
      <ResultContainer>
        {loading && <p>악보를 검색 중 입니다...</p>}
        {!loading && images.length === 0 && <p></p>}
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
            closeFileSearchModals={closeFileSearchModals}
          />
        )}
      </ResultContainer>
    </ModalBody>
  );
};

export default GoogleCustomSearch;
