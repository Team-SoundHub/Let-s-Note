import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import * as StompJS from "@stomp/stompjs";
import * as SockJS from "sockjs-client";
import { setInnerContent } from "../../module/innerContentSlice";

export const stompClient = new StompJS.Client({
  brokerURL: "ws://letsnote-rough-wind-6773.fly.dev/letsnote/socketbroker",
});

export const sendCoordinate = (instrument, x, y) => {
  stompClient.publish({
    destination: "/editor/coordinate",
    body: JSON.stringify({
      instrument: instrument,
      x: x,
      y: y,
    }),
  });
};

const WebSocketContainer = () => {
  const dispatch = useDispatch();
  stompClient.webSocketFactory = function () {
    return new SockJS(
      "https://letsnote-rough-wind-6773.fly.dev/letsnote/socketbroker"
    );
  };

  stompClient.onConnect = (frame) => {
    console.log("Connected: " + frame);
    stompClient.subscribe("/network/result", (response) => {
      const inner_content = JSON.parse(response.body);
      console.log(inner_content);
      dispatch(setInnerContent(inner_content));
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
