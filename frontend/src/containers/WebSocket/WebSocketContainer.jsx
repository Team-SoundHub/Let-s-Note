import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import * as StompJS from "@stomp/stompjs";
import * as SockJS from "sockjs-client";
import { setInnerContent } from "../../app/slices/innerContentSlice";
import { addMessage } from "../../app/slices/chatSlice";

const accessToken = localStorage.getItem("access");
const accountId = localStorage.getItem("accountId");
const space_id = localStorage.getItem("spaceId");

export const stompClient = new StompJS.Client({
  brokerURL: "ws://letsnote-rough-wind-6773.fly.dev/letsnote/ws",
  connectHeaders: {
    accessToken: accessToken,
    spaceId: space_id,
    accountId: accountId
  }
});

export const sendInstrumentReset = (instrument, space_id) => {
  stompClient.publish({
    destination: "",
    body: JSON.stringify({
      instrument: instrument,
      spaceId: space_id,
    }),
  });
};

export const sendCoordinate = (instrument, x, y) => {
  if (!stompClient.active) {
    console.error("좌표 보내기 STOMP connection is not active");
    return;
  }  

  stompClient.publish({
    destination: `/app/workspace/${space_id}/editor/sendCoordinate`,    
    body: JSON.stringify({
      instrument: instrument,
      x: x,
      y: y,
      spaceId: space_id
    }),
  });
};


export const sendMessage = (message, accountId, space_id) => {
  console.log("웹소켓 채팅 요청:", message, accountId);
  stompClient.publish({
    destination: `/app/workspace/${space_id}/chat/sendMessage`,    
    body: JSON.stringify({
      msgContent: message,
      accountId: accountId,      
      spaceId: space_id,
    }),
  });
};


const WebSocketContainer = ({ spaceId }) => {
  const space_id = localStorage.getItem("spaceId");
  const dispatch = useDispatch();
  stompClient.webSocketFactory = function () {
    return new SockJS("https://letsnote-rough-wind-6773.fly.dev/letsnote/ws");
  };

  stompClient.onConnect = (frame) => {
    console.log("Connected: " + frame);

    stompClient.subscribe(`/topic/workspace/${spaceId}/editor/public`, (response) => {
      const inner_content = JSON.parse(response.body);
      console.log("노트 소켓 통신:", inner_content);
      dispatch(setInnerContent(inner_content));
    });

    stompClient.subscribe(`/topic/workspace/${spaceId}/chat/public`, (response) => {    
        const message = JSON.parse(response.body);
        console.log("채팅 소켓 응답:", message);
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