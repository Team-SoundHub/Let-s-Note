import React, { useState } from 'react';
import {Button, Modal, TextInput} from 'flowbite-react';
import FileStoreApi from "../../api/fileStoreApi";

const FileStoreModal = ({ image_url, onClose }) => {

    const handleFileStoreClick = async () => {
        try {
            await FileStoreApi(document.getElementById("fileStoreName").value,image_url);
        } catch (error) {
            console.error("Error storing file:", error);
        }
    };

    return (
        <>
            <Modal show={Boolean(image_url)} onClose={onClose}>
                <Modal.Header>Image Details</Modal.Header>
                <Modal.Body>
                    <div className="space-y-6">
                        <img src={image_url} alt="Selected Image" />
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <TextInput id="fileStoreName" placeholder="파일명 입력" required color="info" />
                    <Button onClick={handleFileStoreClick}>저장하기</Button>
                </Modal.Footer>
                <Modal.Footer>
                    <Button onClick={onClose}>Close</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default FileStoreModal;
