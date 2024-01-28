import { io } from "socket.io-client";
const socket = io("https://letsnote-rough-wind-6773.fly.dev/letsnote/ws");
export default socket;