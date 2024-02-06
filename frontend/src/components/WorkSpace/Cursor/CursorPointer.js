import { useCallback, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import throttle from 'lodash/throttle';

const CursorPointer = ({ spaceId, accountId, sendMousePosition, isConnected, containerRef }) => {
  // BeatBox 좌표 가져오기 1
  const { hover } = useSelector((state) => state.cursor);
  const hoverRef = useRef(hover); // hover 상태를 저장하는 ref
  
  useEffect(() => {
    hoverRef.current = hover; // hover 상태가 변경될 때마다 ref를 업데이트     
  }, [hover]);


  const handleMouseMove = useCallback(throttle((e) => {
    if (!isConnected) {
      console.log("[마우스 이벤트] 아직 연결 안됨");
      return;
    }
    
    // BeatBox 좌표 가져오기 2
    const { i, j } = hoverRef.current;    

    // 상대 좌표 조정
    const adjustedX = e.clientX + (i * 10); 
    const adjustedY = e.clientY + (j * 13);

    const { left, top } = containerRef.current.getBoundingClientRect();

    const x = adjustedX - left;
    const y = adjustedY - top;

    console.log(`e.clientX + ${i}*15 - left = x: ${e.clientX} + ${i * 15} + ${left} = ${x}`);
    console.log(`e.clientY + ${j}*15  - top = y: ${e.clientY} + ${j * 15} - ${top} = ${y}`);

    sendMousePosition(x, y, accountId);    
  }, 200), [isConnected, accountId, sendMousePosition, containerRef]); // 특정 ms 간격으로 이벤트 처리

  useEffect(() => {
    const element = containerRef.current;
    if (element) {
      element.addEventListener('mousemove', handleMouseMove);
    }

    return () => {
      if (element) {
        element.removeEventListener('mousemove', handleMouseMove);
      }
      handleMouseMove.cancel();
    };

  }, [spaceId, isConnected]);

  return null;
};

export default CursorPointer;