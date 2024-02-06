import React, { useState, useEffect } from "react";
import tw from "tailwind-styled-components";

const Overlay = tw.div`
  absolute
  top-0
  left-0
  flex
  items-center
  justify-center
  z-50
  pointer-events-none
`;

const ModalContainer = tw.div`
  flex
  justify-center
  items-center
  w-full
  md:inset-0
  h-full
  max-h-full
`;

const ModalContent = tw.div`
  relative
  p-4
  w-full
  max-w-md
  max-h-full
  pointer-events-auto
`;

const ModalMain = tw.div`
  relative
  bg-white
  rounded-lg
  shadow
  dark:bg-gray-700
`;

const ModalHeader = tw.div`
  flex
  items-center
  justify-between
  p-4
  md:p-5
  border-b
  rounded-t
  dark:border-gray-600
`;

const ModalTitle = tw.h3`
  text-xl
  font-semibold
  text-gray-900
  dark:text-white
`;

const ModalCloseButton = tw.button`
  end-2.5
  text-gray-400
  bg-transparent
  hover:bg-gray-200
  hover:text-gray-900
  rounded-lg
  text-sm
  w-8
  h-8
  ms-auto
  inline-flex
  justify-center
  items-center
  dark:hover:bg-gray-600
  dark:hover:text-white
`;

const ModalBody = tw.div`
  p-4
  md:p-5
`;

const ModalForm = tw.form`
  space-y-4
`;

const ModalInput = tw.input`
  bg-gray-50
  border
  border-gray-300
  text-gray-900
  text-sm
  rounded-lg
  focus:ring-blue-500
  focus:border-blue-500
  block
  w-full
  p-2.5
  dark:bg-gray-600
  dark:border-gray-500
  dark:placeholder-gray-400
  dark:text-white
`;

const NoteViewModal = ({ image_url, onClose }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [originalPosition, setOriginalPosition] = useState({ x: 0, y: 0 });
  const [translate, setTranslate] = useState({ x: 0, y: 0 });

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setOriginalPosition({
      x: e.clientX - translate.x,
      y: e.clientY - translate.y,
    });
    e.stopPropagation();
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const newX = e.clientX - originalPosition.x;
    const newY = e.clientY - originalPosition.y;
    setTranslate({ x: newX, y: newY });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, originalPosition]);
  return (
    <Overlay>
      <ModalContainer tabIndex="-1" aria-hidden="true">
        <ModalContent
          onMouseDown={handleMouseDown}
          style={{
            transform: `translate(${translate.x}px, ${translate.y}px)`,
          }}
        >
          <ModalMain>
            <ModalHeader>
              <ModalTitle>악보</ModalTitle>
              <ModalCloseButton onClick={onClose}>
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  ></path>
                </svg>
                <span className="sr-only">Close modal</span>
              </ModalCloseButton>
            </ModalHeader>
            <ModalBody>
              <img
                className="w-full"
                src={image_url} // 높이를 브라우저 뷰포트의 100% - 모달의 마진으로 설정
              />
              <button
                className="w-full text-white bg-[#49C5B6] hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                onClick={onClose}
              >
                닫기
              </button>
            </ModalBody>
          </ModalMain>
        </ModalContent>
      </ModalContainer>
    </Overlay>
  );
};

export default NoteViewModal;
