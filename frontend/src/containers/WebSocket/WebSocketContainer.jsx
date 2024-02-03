import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import * as StompJS from "@stomp/stompjs";
import * as SockJS from "sockjs-client";
import { setInnerContent } from "../../app/slices/innerContentSlice";
import { addMessage } from "../../app/slices/chatSlice";

const accessToken = sessionStorage.getItem("access");
const accountId = sessionStorage.getItem("accountId");
const space_id = localStorage.getItem("spaceId");

export const stompClient = new StompJS.Client({
  brokerURL: "ws://letsnote-rough-wind-6773.fly.dev/letsnote/ws",
  connectHeaders: {
    accessToken: accessToken,
    spaceId: space_id,
    accountId: accountId,
  },
});

export const sendInstrumentReset = (instrument, spaceId) => {
  stompClient.publish({
    destination: "",
    body: JSON.stringify({
      instrument: instrument,
      spaceId: spaceId,
    }),
  });
};

export const sendCoordinate = (instrument, x, y, spaceId) => {
  if (!stompClient.active) {
    console.error("좌표 보내기 STOMP connection is not active");
    return;
  }

  console.log(`좌표 보내기 publish 직전 - instrument: ${instrument} x:${x} y:${y}, spaceId: ${spaceId}`);

  stompClient.publish({
    destination: `/app/workspace/${spaceId}/editor/sendCoordinate`,
    body: JSON.stringify({
      instrument: instrument,
      x: x,
      y: y,
      spaceId: spaceId,
    }),
  });
  console.log(`좌표 보내기 publish 직후 - instrument: ${instrument} x:${x} y:${y}, spaceId: ${spaceId}`);
};

export const sendMessage = (message, accountId, spaceId) => {
  // console.log("웹소켓 채팅 요청:", message, accountId);
  stompClient.publish({
    destination: `/app/workspace/${spaceId}/chat/sendMessage`,
    body: JSON.stringify({
      msgContent: message,
      accountId: accountId,
      spaceId: spaceId,
    }),
  });
};


const WebSocketContainer = ({ spaceId }) => {

  const dispatch = useDispatch();

  stompClient.webSocketFactory = function () {
    return new SockJS("https://letsnote-rough-wind-6773.fly.dev/letsnote/ws");
  };

  stompClient.onConnect = (frame) => {
    console.log("Connected: " + frame);

    stompClient.subscribe(
      `/topic/workspace/${spaceId}/editor/public`,
      (response) => {
        const inner_content = JSON.parse(response.body);
        console.log("노트 소켓 통신:", inner_content);
        dispatch(setInnerContent(inner_content));
      }
    );

    stompClient.subscribe(
      `/topic/workspace/${spaceId}/chat/public`,
      (response) => {
        const message = JSON.parse(response.body);
        // console.log("채팅 소켓 응답:", message);
        dispatch(addMessage({ spaceId, message }));
      }
    );
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
      // console.log("WebSocket disconnected");
    };
  }, []);

  return <></>;
};

export default WebSocketContainer;
