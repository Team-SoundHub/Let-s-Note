// import React, { useEffect } from "react";
// import { useDispatch } from "react-redux";
// import * as StompJS from "@stomp/stompjs";
// import * as SockJS from "sockjs-client";
// import { setInnerContent } from "../../app/slices/innerContentSlice";
// import { addMessage } from "../../app/slices/chatSlice";
//
// const accessToken = sessionStorage.getItem("access");
// const accountId = sessionStorage.getItem("accountId");
// const space_id = localStorage.getItem("spaceId");
//
// export const stompClient = new StompJS.Client({
//   brokerURL: "ws://localhost:8080/letsnote/ws",
//   connectHeaders: {
//     accessToken: accessToken,
//     spaceId: space_id,
//     accountId: accountId,
//   },
// });
//
// export const sendInstrumentReset = (instrument, space_id) => {
//   stompClient.publish({
//     destination: "",
//     body: JSON.stringify({
//       instrument: instrument,
//       spaceId: space_id,
//     }),
//   });
// };
//
// export const sendCoordinate = (instrument, x, y) => {
//   if (!stompClient.active) {
//     console.error("좌표 보내기 STOMP connection is not active");
//     return;
//   }
//
//   stompClient.publish({
//     destination: `/app/workspace/${spaceId}/editor/sendCoordinate`,
//     body: JSON.stringify({
//       instrument: instrument,
//       x: x,
//       y: y,
//       spaceId: space_id,
//     }),
//   });
// };
//
// export const sendMessage = (message, accountId, space_id) => {
//   // console.log("웹소켓 채팅 요청:", message, accountId);
//   stompClient.publish({
//     destination: `/app/workspace/${spaceId}/chat/sendMessage`,
//     body: JSON.stringify({
//       msgContent: message,
//       accountId: accountId,
//       spaceId: space_id,
//     }),
//   });
// };
//
// const WebSocketContainer = ({ spaceId }) => {
//   const dispatch = useDispatch();
//   stompClient.webSocketFactory = function () {
//     return new SockJS("http:localhost:8080/letsnote/ws");
//   };
//
//   stompClient.onConnect = (frame) => {
//     console.log("Connected: " + frame);
//
//     stompClient.subscribe(
//       `/topic/workspace/${spaceId}/editor/public`,
//       (response) => {
//         const inner_content = JSON.parse(response.body);
//         console.log("노트 소켓 통신:", inner_content);
//         dispatch(setInnerContent(inner_content));
//       }
//     );
//
//     stompClient.subscribe(
//       `/topic/workspace/${spaceId}/chat/public`,
//       (response) => {
//         const message = JSON.parse(response.body);
//         // console.log("채팅 소켓 응답:", message);
//         dispatch(addMessage({ spaceId, message }));
//       }
//     );
//   };
//
//   stompClient.onWebSocketError = (error) => {
//     console.error("Error with websocket", error);
//   };
//
//
//
//   stompClient.onStompError = (frame) => {
//     console.error("Broker reported error: " + frame.headers["message"]);
//     console.error("Additional details: " + frame.body);
//   };
//
//   useEffect(() => {
//     // Component mount logic, including connecting WebSocket
//     stompClient.activate();
//
//     // Cleanup function to disconnect WebSocket when component is unmounted
//     return () => {
//       stompClient.deactivate();
//       // console.log("WebSocket disconnected");
//     };
//   }, []);
//
//   return <></>;
// };
//
// export default WebSocketContainer;
//
//

import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import * as StompJS from "@stomp/stompjs";
import * as SockJS from "sockjs-client";
import { setInnerContent } from "../../app/slices/innerContentSlice";
import { addMessage } from "../../app/slices/chatSlice";

const accessToken = sessionStorage.getItem("access");
const accountId = sessionStorage.getItem("accountId");
const space_id = localStorage.getItem("spaceId");

export const stompClient = new StompJS.Client({
  brokerURL: "ws://localhost:8080/letsnote/ws",
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

  stompClient.publish({
    destination: `/app/workspace/${spaceId}/editor/sendCoordinate`,
    body: JSON.stringify({
      instrument: instrument,
      x: x,
      y: y,
      spaceId: spaceId,
    }),
  });
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

const sendMousePosition = (accountId, x, y) => {
  stompClient.publish({
    destination: `/app/workspace/${space_id}/mousePosition`,
    body: JSON.stringify({
      x : x,
      y : y,
      accountId : accountId,
    }),
  });
};

const handleMouseMove = (event: React.MouseEvent) => {
  const { clientX: x, clientY: y } = event;
  sendMousePosition(accountId , x, y);
};


const WebSocketContainer = ({ spaceId }) => {
  const dispatch = useDispatch();
  const [mousePosition, setMousePosition] = useState({});

  stompClient.webSocketFactory = function () {
    return new SockJS("http:localhost:8080/letsnote/ws");
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

    stompClient.subscribe(
      `/topic/workspace/${spaceId}/mousePosition`,
      (response) => {
        const data = JSON.parse(response.body);
        console.log(data)
        setMousePosition((prevPositions) => ({
          ...prevPositions,
          [data.accountId]: { x: data.x, y: data.y },
        }));
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

  return (
    <div style={{ position: 'relative', height: '500px', border: '1px solid black' }} onMouseMove={handleMouseMove}>
            {Object.entries(mousePosition).map(([accountId, position]) => (
              <div
                key={otherAccountId}
                style={{
                  position: 'absolute',
                  left: position.x,
                  top: position.y,
                  backgroundColor: 'red',
                  width: '10px',
                  height: '10px',
                  borderRadius: '50%',
                }}
              />
            ))}
    </div>
  );
};

export default WebSocketContainer;
