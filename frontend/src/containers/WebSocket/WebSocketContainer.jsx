import React from 'react';
import * as StompJS from '@stomp/stompjs';
import * as SockJS from 'sockjs-client'
import BeatGrid from "../../components/BeatGrid/BeatGrid";
const WebSocketContainer = () => {
    // 포트는 테스트하시는 스프링부트 포트로 변경해야 합니다!!
    const stompClient = new StompJS.Client({
        brokerURL: 'ws://letsnote-rough-wind-6773.fly.dev/letsnote/socketbroker'
    });
    stompClient.webSocketFactory= function () {
        return new SockJS("https://letsnote-rough-wind-6773.fly.dev/letsnote/socketbroker");
    };

    stompClient.onConnect = (frame) => {
        console.log('Connected: ' + frame);
        stompClient.subscribe('/network/result', (response) => {
            showResult(JSON.parse(response.body));
            const inner_content = JSON.parse(response.body);
            BeatGrid.activateBox(inner_content.x, inner_content.y);
        });
    };


    stompClient.onWebSocketError = (error) => {
        console.error('Error with websocket', error);
    };

    stompClient.onStompError = (frame) => {
        console.error('Broker reported error: ' + frame.headers['message']);
        console.error('Additional details: ' + frame.body);
    };

    function connect() {
        stompClient.activate();
    }

    function disconnect() {
        stompClient.deactivate();
        console.log("Disconnected");
    }

    function sendCoordinate() {
        stompClient.publish({
            destination: "/editor/coordinate",
            body: JSON.stringify(
                {
                    'instrument': '기타',
                    'x': 1,
                    'y': 2
                }
            )
        });
    }

    function showResult(content) {

        // Create a table row with cells for each property
        const newRow = document.createElement("tr");
        newRow.innerHTML = "<td>" + content.instrument + "</td><td>" + content.x + "</td><td>" + content.y + "</td>";

        // Append the new row to the table
        document.getElementById("result").appendChild(newRow);
    }

    return (
        <div>
            <button onClick={connect}>
                난 커넥션
            </button>
            <button onClick={disconnect}>
                난 디스커넥션
            </button>
            <button onClick={sendCoordinate}>
                좌표 보내기
            </button>
            <table id="result">
            </table>
        </div>
    );
};

export default WebSocketContainer;