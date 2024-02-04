import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { updateCursorPosition } from '../../app/slices/cursorSlice';

const CursorPointer = ({ spaceId, accountId, sendMousePosition, isConnected }) => {
  const dispatch = useDispatch();

  const handleMouseMove = (e) => {
    if (!isConnected) {
        console.log("[마우스 이벤트] 아직 연결 안됨");
        return;
    }
    const { clientX: x, clientY: y } = e; 
           
    sendMousePosition(x, y, accountId);    
  };

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [spaceId, isConnected]);

  return null; 
};

export default CursorPointer;