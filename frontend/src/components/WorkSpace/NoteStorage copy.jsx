import React, {useState, useEffect, useRef} from 'react';
import NoteImage from "./NoteImage";
import FileGetApi from "../../api/fileGetApi";
import styled, {css} from "styled-components";
import chatImage from "../../assets/bubble-chat2.png";

const StyledNoteStorage = styled.div`
  height: 600px; // 높이 조정
  width: 600px; // 너비 조정
  position: fixed;
  right: 0;
  top: 50%;
  background-color: white;
  border: 1px solid gray;
  border-radius: 10px;
  transition: transform 0.4s ease-out;
  transform: translateY(-50%) translateX(${props => props.isVisible ? "0" : "100%"});
  &:hover {
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  }
`;

const StyledChatContainer = styled.div`
  height: 90vh;
  width: 30vw;
  position: fixed;
  right: 0;
  top: 50%;
  background-color: white;
  border: 1px solid gray;
  border-radius: 10px;
  // transition: transform 0.4s ease-out;
  &:hover {
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  }

  ${({ isVisible }) =>
    isVisible &&
    css`
      transform: translateY(-50%) translateX(0);
    `}
`;

const ChatTab = styled.div`
  position: fixed;
  right: 2rem;
  top: 10%;
  transform: translateY(-50%);
  background-image: url(${chatImage});
  background-size: cover; // 이미지 크기를 컨테이너에 맞게 조절
  border-radius: 50%;
  width: 50px;
  height: 50px;
  cursor: pointer;
  transition: all 0.3s ease; // 부드러운 효과를 위한 전환

  &:hover {
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
    transform: translateY(-50%) scale(1.1);
  }
`;

const ChatHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  background-color: #49c5b6;
  color: white;
  cursor: move; // 드래그 가능한 커서 모양

  &:hover {
    background-color: #277a70;
  }
`;

const CloseButton = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  padding: 10px;
  cursor: pointer;
  color: white;
  &:after {
    content: "x";
    font-size: 1.3rem;
    font-weight: bold;
  }

  &:hover {
    transform: scale(1.1);
    color: black;
  }
`;

const NoteStorage = ({openImageModal}) => {
    const [loading, setLoading] = useState(false);
    const [images, setImages] = useState([]);
    const [isVisible, setIsVisible] = useState(false);

    const fetchImages = async () => {
        setLoading(true);
        try {
            const response = await FileGetApi();
            setImages(response); // Assuming response is an array of images
        } catch (error) {
            console.error('Error fetching images:', error);
        } finally {
            setLoading(false);
        }
    };


    // return (
    //         <div id="note-storage" className="absolute bg-gray-100 rounded-lg w-[600px] h-[600px] right-[-200px]">
    //             <div className={"-rotate-90"}>
                    // <NoteImage images={images} openImageModal={openImageModal} loading={loading} fetchImages={fetchImages} />
    //             </div>
    //         </div>
    // );
    return (
      <StyledNoteStorage isVisible={isVisible}>
        <NoteImage images={images} openImageModal={openImageModal} loading={loading} fetchImages={fetchImages} />
      </StyledNoteStorage>
    );
};

export default NoteStorage;
