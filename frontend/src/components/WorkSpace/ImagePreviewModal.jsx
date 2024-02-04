import React from 'react';
import { Button, Modal } from 'flowbite-react';

const ImagePreviewModal = ({ image_url, onClose }) => {
    return (
        <Modal show={Boolean(image_url)} onClose={onClose}>
            <Modal.Body>
                <div className="flex justify-center items-center">
                    {/* 이미지를 중앙에 배치하고, 모달 크기에 맞추어 조절 */}
                    <img 
                        src={image_url} 
                        alt="Selected Image"
                        className="max-w-full max-h-[calc(100vh-4rem)] object-contain" // 높이를 브라우저 뷰포트의 100% - 모달의 마진으로 설정
                    />
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={onClose}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ImagePreviewModal;
