// import React from 'react';
// import styled from 'styled-components';

// // 모달 컨테이너 스타일 정의
// const ModalContainer = styled.div`
//   position: fixed;
//   right: 0;
//   top: 0;
//   width: 33.333%; // 1/3 of the screen
//   height: 100%;
//   background-color: white;
//   box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
//   z-index: 1050; // Ensure it sits above other content
//   display: flex;
//   flex-direction: column;
//   align-items: center; // 이미지를 중앙에 정렬
//   justify-content: center; // 이미지를 중앙에 정렬
//   padding: 20px;
// `;

// // 닫기 버튼 스타일 정의
// const CloseButton = styled.button`
//   position: absolute;
//   right: 20px;
//   top: 20px;
//   font-size: 24px;
//   line-height: 24px;
//   width: 30px;
//   height: 30px;
//   border: none;
//   background: none;
//   cursor: pointer;
// `;

// const ImagePreviewModal = ({ image_url, onClose }) => {
//   if (!image_url) {
//     return null; // image_url이 없으면 아무것도 렌더링하지 않음
//   }

//   return (
//     <ModalContainer>
//       <CloseButton onClick={onClose}>×</CloseButton>
//       <img
//         src={image_url}
//         alt="Preview"
//         style={{ maxWidth: '100%', maxHeight: '80vh', objectFit: 'contain' }} // 뷰포트 높이의 80%를 최대 높이로 설정
//       />
//     </ModalContainer>
//   );
// };

// export default ImagePreviewModal;


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


// const ImagePreviewModal = ({ image_url, onClose }) => {
//     return (
//         <Modal show={Boolean(image_url)} onClose={onClose}>
//             <Modal.Body>
//                 <div className="flex justify-center items-center">
//                     {/* 이미지를 중앙에 배치하고, 모달 크기에 맞추어 조절 */}
//                     <img
//                         src={image_url}
//                         alt="Selected Image"
//                         className="max-w-full max-h-[calc(100vh-4rem)] object-contain" // 높이를 브라우저 뷰포트의 100% - 모달의 마진으로 설정
//                     />
//                 </div>
//             </Modal.Body>
//             <Modal.Footer>
//                 <Button onClick={onClose}>Close</Button>
//             </Modal.Footer>
//         </Modal>
//     );
// };

// export default ImagePreviewModal;