import React, { useEffect, useState, useRef } from "react";

const SocketTest = () => {
  const [socketConnected, setSocketConnected] = useState(false);
  const [sendMsg, setSendMsg] = useState(false);
  const [items, setItems] = useState([]);

  const webSocketUrl = `ws://websocket.com`;
  let ws = useRef(null);

  // 소켓 객체 생성
  useEffect(() => {
    if (!ws.current) {
      ws.current = new WebSocket(webSocketUrl);
      ws.current.onopen = () => {
        console.log("connected to " + webSocketUrl);
        setSocketConnected(true);
      };
      ws.current.onclose = (error) => {
        console.log("disconnect from " + webSocketUrl);
        console.log(error);
      };
      ws.current.onerror = (error) => {
        console.log("connection error " + webSocketUrl);
        console.log(error);
      };
    }

    return () => {
      console.log("clean up");
      ws.current.close();
    };
  }, []);

  // 소켓이 연결되었을 시에 send 메소드
  useEffect(() => {
    if (socketConnected) {
      ws.current.send(
        JSON.stringify({
          message: "Hello",
        })
      );

      setSendMsg(true);
    }
  }, [socketConnected]);

  // send 후에 onmessage로 데이터 가져오기
  useEffect(() => {
    if (sendMsg) {
      ws.current.onmessage = (evt) => {
        const data = JSON.parse(evt.data);
        console.log(data);
        setItems((prevItems) => [...prevItems, data]);
      };
    }
  }, [sendMsg]);

  return (
    <div>
      <div>socket</div>
      <div>socket connected : {`${socketConnected}`}</div>
      <div>res : </div>
      <div>
        {items.map((item) => {
          return <div>{JSON.stringify(item)}</div>;
        })}
      </div>
    </div>
  );
};

export default SocketTest;
