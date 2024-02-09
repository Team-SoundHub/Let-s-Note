import React, { useState } from 'react';
import {Button, Modal, TextInput} from 'flowbite-react';
import FileStoreApi from "../../api/fileStoreApi";
import Swal from "sweetalert2"
import {useParams} from "react-router-dom";

const FileStoreModal = ({ image_url, onClose }) => {    
    const handleFileStoreClick = async () => {
        try {
            Swal.fire({
                title: "Do you want to save the changes?",
                showDenyButton: true,
                showCancelButton: true,
                confirmButtonText: "Save",
                denyButtonText: `Don't save`
              }).then(async (result) => {
                /* Read more about isConfirmed, isDenied below */
                if (result.isConfirmed) {
                  await FileStoreApi(document.getElementById("fileStoreName").value, image_url);
                  Swal.fire("악보가 저장되었습니다 !", "보관함을 확인하세요!", "success");
                } else if (result.isDenied) {
                  Swal.fire("저장이 취소되었습니다.", "", "info");
                }
              });
              
            // await FileStoreApi(document.getElementById("fileStoreName").value,image_url);
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "에러 발생 !",
                text: "Something went wrong!",
              });
              
            // console.error("Error storing file:", error);
        }
    };

    return (
        <>
            <Modal show={Boolean(image_url)} onClose={onClose} className={"z-[1050]"}>
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
