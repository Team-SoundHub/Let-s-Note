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

  const isConnectedRef = useRef(isConnected);
  useEffect(() => {
    isConnectedRef.current = isConnected;
  }, [isConnected]);

  // 마우스 좌표 전달 함수 (throttle 적용)
  const throttledMouseMove = useRef(throttle((e) => {
    if (!isConnectedRef.current) {
      console.log("[마우스 이벤트] 아직 연결 안됨");
      return;
    }
    const { x: hoverX, y: hoverY } = hoverRef.current;
    sendMousePosition(hoverX, hoverY, accountId);
  }, 200)).current;

  useEffect(()=>{
    throttledMouseMove();

    // 언마운트시 조건 추가하면 throttle이 적용이 안됨.. useEffect 작동방식과 충돌하는 듯
    // return () => {
    //   throttledMouseMove.cancel();
    // }
  }, [hover])
  
  // 이벤트 리스너 -> 마우스 좌표 전달 실행
  // useEffect(() => {
  //   const element = containerRef.current;
  //   if (element) {
  //     element.addEventListener('mousemove', throttledMouseMove);
  //   }

  //   return () => {
  //     if (element) {
  //       element.removeEventListener('mousemove', throttledMouseMove);
  //     }
  //     throttledMouseMove.cancel();
  //   };
  // }, [throttledMouseMove, containerRef]);

  return null;
};

export default CursorPointer;

