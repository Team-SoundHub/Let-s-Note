import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import * as StompJS from "@stomp/stompjs";
import * as SockJS from "sockjs-client";
import { setInnerContent } from "../../app/slices/innerContentSlice";
import { addMessage } from "../../app/slices/chatSlice";

const WebSocketContainer = ({ spaceId, children }) => {
  const dispatch = useDispatch();
  const [stompClient, setStompClient] = useState(null);

  useEffect(() => {
    const accessToken = sessionStorage.getItem("access");
    const accountId = sessionStorage.getItem("accountId");
    console.log("[WebSocketContainer] accessToken 꺼냄:", accessToken);
    console.log("[WebSocketContainer] accountId 꺼냄:", accountId);
    console.log("[WebSocketContainer] spaceId 받아옴:", spaceId);

    const client = new StompJS.Client({
      brokerURL: "ws://letsnote-rough-wind-6773.fly.dev/letsnote/ws",
      connectHeaders: {
        accessToken: accessToken,
        spaceId: spaceId,
        accountId: accountId,
      },
      webSocketFactory: () => new SockJS("https://letsnote-rough-wind-6773.fly.dev/letsnote/ws"),
      onConnect: () => {
        console.log("Connected: ");
        // 여기에 구독 로직 추가
        subscribeToTopics(client);
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
        body: JSON.stringify({ instrument, x, y, spaceId }),
      });
    },
    sendMessage: (message) => {
      if (!stompClient || !stompClient.active) {
        console.error("STOMP connection is not active");
        return;
      }
      stompClient.publish({
        destination: `/app/workspace/${spaceId}/chat/sendMessage`,
        body: JSON.stringify({ msgContent: message, accountId: sessionStorage.getItem("accountId"), spaceId }),
      });
    },
  });
};

export default WebSocketContainer;
