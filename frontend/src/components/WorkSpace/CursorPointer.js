import { useCallback, useEffect } from 'react';
import throttle from 'lodash/throttle'; // lodash의 throttle 함수를 사용

const CursorPointer = ({ spaceId, accountId, sendMousePosition, isConnected }) => {  
  const handleMouseMove = useCallback(throttle((e) => {
    if (!isConnected) {
      console.log("[마우스 이벤트] 아직 연결 안됨");
        return;
    }
    const { clientX: x, clientY: y } = e;
    sendMousePosition(x, y, accountId);
  }, 17), [isConnected, accountId, sendMousePosition]); // 100ms 간격으로 이벤트 처리

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      handleMouseMove.cancel(); // 컴포넌트 언마운트 시 throttle 취소
    };
  }, [spaceId, isConnected]);

  return null; 
};

export default CursorPointer;