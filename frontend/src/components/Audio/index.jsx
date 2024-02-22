import React, { useEffect, useRef, useState } from 'react';
import styled, { css } from 'styled-components';
import soundMuteIcon from '../../assets/workspace/soundMute.png';

const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem; /* space-x-2 equivalent */
`;

const VideoContainer = styled.audio`
  height: 0px;
  width: 0px;
`;

const UserLabel = styled.button`
  display: flex; 
  justify-content: center; 
  align-items: center; 
  background-color: #b1f1b0; 
  /* color: #1e40af;  */
  color: #444444; 
  font-size: 0.875rem; 
  font-weight: 500;   
  max-height: 2.1rem;
  padding: 0.625rem 1.25rem; 
  border: 0.1rem solid #71ff4a;
  border-radius: 0.75rem; 
  transition: background-color 0.2s ease-in-out;

  ${props => props.muted && css`
    background-color: #9ca3af; 
	border: 0.1rem solid #ababab;
	max-height: 2.1rem;
    color: #f3f4f6; 	
  `}

  &:hover {
    background-color: #93c5fd; 
  }
`;

const muteIcon = styled.img`
	width: 3rem;
	height: 3rem;
	
`

const Audio = ({ stream, muted, username, users }) => {
  const ref = useRef(null);
  const [isMuted, setIsMuted] = useState(muted);    

  const handleMute = () => {
    setIsMuted(!isMuted);    
  }

  useEffect(() => {
    if (ref.current) ref.current.srcObject = stream;
    if (muted !== isMuted) setIsMuted(muted);
    
  }, [stream, muted, users]);

  return (
    <Container>
      <UserLabel onClick={handleMute} muted={isMuted}>
        {username} 
      </UserLabel>
      <VideoContainer ref={ref} muted={isMuted} autoPlay volume="0.5" />
    </Container>
  );
};

export default Audio;
