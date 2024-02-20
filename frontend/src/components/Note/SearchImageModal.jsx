import React, { useState } from 'react';
import { Button, Modal } from 'flowbite-react';
import styled from "styled-components";

const FormButton = styled.a`
  position: relative;
  display: inline-block;
  padding: 10px 20px;
  color: #569d94;
  font-size: 16px;
  text-decoration: none;
  text-transform: uppercase;
  overflow: hidden;
  transition: 0.5s;
  margin-top: 40px;
  letter-spacing: 4px;
  cursor: pointer;

  &::before {
    content: "";
    position: absolute;
    top: 90%;
    left: 10%;
    width: 0;
    height: 2px;
    background: #569d94;
    transition: 0.3s;
  }

  &:hover::before {
    width: 80%;
  }
`;

const SearchImageModal = ({ image_url, onClose, openFileStoreModal }) => {
    return (
        <>
            <Modal show={Boolean(image_url)} onClose={onClose} className={"z-[1000]"}>
                <Modal.Header>찾으시는 악보가 맞나요?</Modal.Header>
                <Modal.Body>
                    <div className="space-y-6">
                        <img src={image_url} alt="Selected Image" />
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <FormButton onClick={onClose}>
                        닫기
                    </FormButton>
                    <FormButton
                        type="submit"
                        onClick={() => openFileStoreModal(image_url)}
                    >
                        보관함에 저장
                    </FormButton>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default SearchImageModal;
