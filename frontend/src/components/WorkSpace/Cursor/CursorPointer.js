import { useCallback, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import throttle from 'lodash/throttle';

const CursorPointer = ({ 
  spaceId, 
  accountId, 
  sendMousePosition, 
  isConnected, 
  containerRef 
}) => {
  // 스토어에서 마우스 상대좌표 가져오기
  const hover = useSelector((state) => state.cursor.hover);
  const hoverRef = useRef(hover);

  useEffect(() => {
    hoverRef.current = hover;
  }, [hover]);

  // 마우스 좌표 전달 함수 (throttle 적용)
  const throttledMouseMove = useRef(throttle((e) => {
    if (!isConnected) {
      console.log("[마우스 이벤트] 아직 연결 안됨");
      return;
    }
    const { x: hoverX, y: hoverY } = hoverRef.current;
    sendMousePosition(hoverX, hoverY, accountId);
  }, 200)).current;

  // 이벤트 리스너 -> 마우스 좌표 전달 실행
  useEffect(() => {
    const element = containerRef.current;
    if (element) {
      element.addEventListener('mousemove', throttledMouseMove);
    }

    return () => {
      if (element) {
        element.removeEventListener('mousemove', throttledMouseMove);
      }
      throttledMouseMove.cancel();
    };
  }, [throttledMouseMove, containerRef]);

  return null;
};

export default CursorPointer;

