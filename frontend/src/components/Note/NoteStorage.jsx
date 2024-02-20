import React, { useState, useEffect, useRef } from "react";
import tw from "tailwind-styled-components";
import NoteImage from "./NoteImage";
import FileGetApi from "../../api/fileGetApi";

const ModalBody = tw.div`
  relative
  flex
  flex-col
  p-4
  md:p-5
`;

const NoteStorage = ({ openImageModal }) => {
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState([]);
  const fetchImages = async () => {
    setLoading(true);
    try {
      const response = await FileGetApi();
      setImages(response); // Assuming response is an array of images
    } catch (error) {
      console.error("Error fetching images:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ModalBody>
      <div
        id="note-storage"
        className="absolute bg-gray-100 rounded-lg w-[600px] h-[600px] right-[-200px]"
      >
        <div className={"-rotate-90"}>
          <NoteImage
            images={images}
            openImageModal={openImageModal}
            loading={loading}
            fetchImages={fetchImages}
          />
        </div>
      </div>
    </ModalBody>
  );
};

export default NoteStorage;
