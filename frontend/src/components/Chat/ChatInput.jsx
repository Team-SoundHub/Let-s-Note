import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import styled from 'styled-components';
import { uploadImage } from '../../app/slices/imageSlice';

const InputArea = styled.div`
  background-color: white;
  min-height: 50px;
  display: flex;
  position: absolute;
  bottom: 0;
  width: 100%;
`;

const PlusButton = styled.div`
  background-color: lightslategray;
  width: 50px;
  color: white;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24px;

  &:hover {
    background-color: #49C5B6;
  }
`;

const InputContainer = styled.form`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const StyledInput = styled.input`
  flex-grow: 1; // 입력 필드가 남은 공간을 채우도록
  padding: 5px;
  border-radius: 0;
  border: none;

  &:focus {
    outline: none;
  }
`;

const StyledButton = styled.button`
  min-width: 70px;
  border-radius: 0;
  background-color: #49C5B6;
  color: white;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: #277A70;
  }

  &:disabled {
    background-color: #49C5B6;
    cursor: default;
    color: grey;
  }
`;

const ImageCancelButton = styled.button`
  background-color: white;  
  border: white 1px solid;
  &:hover {
    transform: scale(1.1);
  }
`;


const ChatInput = ({ handleSendMessage }) => {
  const dispatch = useDispatch();
  const [message, setMessage] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  useEffect(() => {
    if (!selectedFile) {
      setPreviewUrl(null);
      return;
    }

    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPreviewUrl(fileReader.result);
    };
    fileReader.readAsDataURL(selectedFile);
  }, [selectedFile]);


  const handleSubmit = (event) => {
    event.preventDefault();
    if (selectedFile) {
      dispatch(uploadImage(selectedFile));
    } else {      
      handleSendMessage(message);      
    }
    setMessage('');
    setSelectedFile(null);
  };

  const handleFileSelect = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleCancelFile = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
  };

  return (
    <InputArea>
      <input type="file" onChange={handleFileSelect} style={{ display: 'none' }} id="file-upload" />
      <PlusButton onClick={() => document.getElementById('file-upload').click()}>+</PlusButton>
      <InputContainer onSubmit={handleSubmit}>
      {previewUrl && (
          <div>
            <ImageCancelButton onClick={handleCancelFile}>x</ImageCancelButton> 
            <img src={previewUrl} alt="Preview" style={{ width: '100%', maxHeight: '100px', objectFit: 'contain' }} />
          </div>
        )}
        <StyledInput
          type="text"
          placeholder="채팅을 입력하세요"
          value={message}
          onChange={(event) => setMessage(event.target.value)}
        />

        <StyledButton
          disabled={message === "" && !selectedFile}
          type="submit"
        >
          전송
        </StyledButton>
      </InputContainer>
    </InputArea>
  );
};

export default ChatInput;
