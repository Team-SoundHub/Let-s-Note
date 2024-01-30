import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import * as StompJS from "@stomp/stompjs";
import * as SockJS from "sockjs-client";
import { setInnerContent } from "../../app/slices/innerContentSlice";
import { addMessage } from "../../app/slices/chatSlice";

export const stompClient = new StompJS.Client({
  brokerURL: "ws://letsnote-rough-wind-6773.fly.dev/letsnote/ws",
});

export const sendCoordinate = (instrument, x, y) => {
  stompClient.publish({
    destination: "/app/editor/coordinate",
    body: JSON.stringify({
      instrument: instrument,
      x: x,
      y: y,
    }),
  });
};

export const sendMessage = (message, accountId) => {
// export const sendMessage = (message, nickname, spaceId, accountId) => {
    stompClient.publish({
        destination: "/app/chat/sendMessage",
        body: JSON.stringify({
            msgContent: message,
            // nickname: nickname,
            // spaceId: spaceId,
            accountId: accountId
        })
    })
}

const WebSocketContainer = ({spaceId}) => {
  const dispatch = useDispatch();
  stompClient.webSocketFactory = function () {
    return new SockJS(
      "https://letsnote-rough-wind-6773.fly.dev/letsnote/ws"
    );
  };

  stompClient.onConnect = (frame) => {
    console.log("Connected: " + frame);
    stompClient.subscribe("/topic/editor/coordinate", (response) => {
      const inner_content = JSON.parse(response.body);
      console.log("노트 소켓 통신:", inner_content);
      dispatch(setInnerContent(inner_content));
    });

    stompClient.subscribe(`/topic/chat/public`, (response) => {
        const message = JSON.parse(response.body);
        console.log("채팅 소켓 통신:", message);
        dispatch(addMessage({ spaceId, message }));
      });
  };


  stompClient.onWebSocketError = (error) => {
    console.error("Error with websocket", error);
  };

  stompClient.onStompError = (frame) => {
    console.error("Broker reported error: " + frame.headers["message"]);
    console.error("Additional details: " + frame.body);
  };

  useEffect(() => {
    // Component mount logic, including connecting WebSocket
    stompClient.activate();

    // Cleanup function to disconnect WebSocket when component is unmounted
    return () => {
      stompClient.deactivate();
      console.log("WebSocket disconnected");
    };
  }, []);

  return <></>;
};

export default WebSocketContainer;
