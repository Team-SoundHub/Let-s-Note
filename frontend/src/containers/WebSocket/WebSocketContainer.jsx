import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import * as StompJS from "@stomp/stompjs";
import * as SockJS from "sockjs-client";
import { setInnerContent } from "../../app/slices/innerContentSlice";
import { addMessage } from "../../app/slices/chatSlice";
import { updateCursorPosition } from "../../app/slices/cursorSlice";

const WebSocketContainer = ({ spaceId, children }) => {
  const dispatch = useDispatch();
  const [stompClient, setStompClient] = useState(null);
  const [isConnected, setIsConnected] = useState(false);  

  useEffect(() => {
    const accessToken = sessionStorage.getItem("access");
    const accountId = sessionStorage.getItem("accountId");
    console.log("[WebSocketContainer] accessToken 꺼냄:", accessToken);
    console.log("[WebSocketContainer] accountId 꺼냄:", accountId);
    console.log("[WebSocketContainer] spaceId 받아옴:", spaceId);

    const client = new StompJS.Client({
      brokerURL: `${process.env.REACT_APP_SOCKET_URL}/letsnote/ws`,
      connectHeaders: {
        accessToken: accessToken,
        spaceId: spaceId,
        accountId: accountId,
      },
      webSocketFactory: () => new SockJS(`${process.env.REACT_APP_SOCKET_HTTP}/letsnote/ws`),
      onConnect: () => {
        console.log("Connected: ", );
        setIsConnected(true); 
        subscribeToTopics(client);
      },
      onDisconnect: () => {        
        setIsConnected(false);
      },      
      onStompError: (frame) => {
        console.error("Broker reported error: " + frame.headers["message"]);
        console.error("Additional details: " + frame.body);
      },
    });

    client.activate();
    setStompClient(client);

    return () => {
      client.deactivate();
    };
  }, [spaceId, dispatch]);

  const subscribeToTopics = (client) => {
    client.subscribe(`/topic/workspace/${spaceId}/editor/public`, (response) => {
      const inner_content = JSON.parse(response.body);
      dispatch(setInnerContent(inner_content));
    });

    client.subscribe(`/topic/workspace/${spaceId}/chat/public`, (response) => {
      const message = JSON.parse(response.body);
      dispatch(addMessage({ spaceId, message }));
    });

    console.log("[WebSocket] 마우스 커서 구독");
    client.subscribe(`/topic/workspace/${spaceId}/mouse/public`, (response) => {
      const cursorData = JSON.parse(response.body);
      let x = cursorData.x;      
      let y = cursorData.y;      
      let accountId = cursorData.accountId;      
      let nickname = cursorData.nickname;      
      // console.log("[WebSocket] 마우스 커서 수신:", x, y, accountId, nickname);
      dispatch(updateCursorPosition({ accountId, x, y, nickname }));

    });
  };

  // 함수를 자식 컴포넌트에 전달
  return children({
    sendCoordinate: (instrument, x, y) => {
      if (!stompClient || !stompClient.active) {
        console.error("STOMP connection is not active");
        return;
      }
      stompClient.publish({
        destination: `/app/workspace/${spaceId}/editor/sendCoordinate`,
        body: JSON.stringify({
          instrument,
          x,
          y,
          spaceId
        }),
      });
    },
    sendMessage: (message) => {
      if (!stompClient || !stompClient.active) {
        console.error("STOMP connection is not active");
        return;
      }
      stompClient.publish({
        destination: `/app/workspace/${spaceId}/chat/sendMessage`,
        body: JSON.stringify({
          msgContent: message,
          accountId: sessionStorage.getItem("accountId"),
          spaceId
        }),
      });
    },
    sendMousePosition: (x, y, accountId) => {
      if (!stompClient || !stompClient.active) {
        console.error("STOMP connection is not active - Mouse");
        return;
      }      
      const timestamp = Date.now();
      function formatTimestamp(timestamp) {
        const date = new Date(timestamp);
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        const seconds = date.getSeconds().toString().padStart(2, '0');
        const milliseconds = date.getMilliseconds().toString().padStart(3, '0');
        return `${hours}:${minutes}:${seconds}.${milliseconds}`;
      }
      stompClient.publish({
        destination: `/app/workspace/${spaceId}/mouse/sendMousePosition`,
        body: JSON.stringify({
          x,
          y,
          accountId
        }),
      });
      console.log(`마우스 커서 소켓 요청: x:${x} y:${y} spaceId:${spaceId} accountId:${accountId} timestamp:${formatTimestamp(timestamp)}`)      
    },
    isConnected,
  });
};

export default WebSocketContainer;
