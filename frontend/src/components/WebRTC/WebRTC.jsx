import { Button } from "flowbite-react";
import React, { useState, useRef } from "react";
import Webcam from "react-webcam";

const WebRTC = ({peers,endVoiceChat,startVoiceChat,audioRef,videoRef,}) => {
  

    return(
        <div>
          {peers.length > 0 ? (
            <>
              <audio ref={audioRef} autoPlay />
              <Webcam audioRef={videoRef} />
              <Button onClick={endVoiceChat}>End Voice Chat</Button>
            </>
          ) : (
            <Button onClick={startVoiceChat}>Start Voice Chat</Button>
          )}
        </div>
    );
}

export default WebRTC;