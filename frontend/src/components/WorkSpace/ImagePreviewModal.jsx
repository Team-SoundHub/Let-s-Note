import React from 'react';
import { Button, Modal } from 'flowbite-react';

const ImagePreviewModal = ({ image_url, onClose }) => {
    return (
        <Modal show={Boolean(image_url)} onClose={onClose}>

            <div className={`fixed right-0 top-0 w-1/3 h-full bg-white shadow-lg z-10`}>
                <div className="flex justify-end p-4">
                    <button onClick={onClose} className="text-xl font-bold">X</button>
                </div>
                <div className="flex justify-center items-center h-full p-4">
                    <img
                        src={image_url}
                        alt="Selected Image"
                        className="max-w-full max-h-[calc(100vh-4rem)] object-contain" // 높이를 브라우저 뷰포트의 100% - 모달의 마진으로 설정
                    />
                </div>
            </div>
        </Modal>
    );
};

export default ImagePreviewModal;