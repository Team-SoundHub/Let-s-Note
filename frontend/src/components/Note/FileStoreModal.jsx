import React, { useState } from 'react';
import {Button, Modal, TextInput} from 'flowbite-react';
import FileStoreApi from "../../api/fileStoreApi";
import Swal from "sweetalert2"
import {useParams} from "react-router-dom";

const FileStoreModal = ({ image_url, onClose }) => {    
    const handleFileStoreClick = async () => {
        try {
            Swal.fire({
                title: "악보를 저장하시겠습니까?",
                showDenyButton: true,
                // showCancelButton: true,
                confirmButtonText: "네",
                denyButtonText: `아니오`
              }).then(async (result) => {
                /* Read more about isConfirmed, isDenied below */
                if (result.isConfirmed) {
                  await FileStoreApi(document.getElementById("fileStoreName").value, image_url);
                  Swal.fire("악보가 저장되었습니다.", "보관함을 확인하세요!", "success");
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
                <Modal.Header>저장할 악보의 이름을 정해주세요</Modal.Header>
                <Modal.Body>
                    <div className="space-y-6">
                        <img src={image_url} alt="Selected Image" />
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <TextInput id="fileStoreName" placeholder="악보 이름 입력" required color="info" />
                    <Button onClick={handleFileStoreClick}>저장하기</Button>
                </Modal.Footer>
                <Modal.Footer>
                    <Button onClick={onClose}>닫기</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default FileStoreModal;
