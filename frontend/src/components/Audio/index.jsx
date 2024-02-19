import React, { useEffect, useRef, useState } from 'react';
import tw from 'tailwind-styled-components';
import styled from 'styled-components';
import Button from '../common/Button';
import cx from "classnames";

const Container = tw.div`
	flex
	items-center
	space-x-2
`;

const VideoContainer = styled.audio`
	height : 0px;
	width: 0px;
`;

const UserLabel = tw.button`
	bg-blue-100
	text-blue-800
	text-sm
	font-medium
	me-2
	px-5
	py-2.5
	rounded-xl
	dark:bg-blue-900
	dark:text-blue-300
`;

const Audio = ({ stream, muted, username, users }) => {
	const ref = useRef(null);
	const [isMuted, setIsMuted] = useState(false);

    const handleMute = () => {
        setIsMuted(!isMuted);
    }

	useEffect(() => {
		if (ref.current) ref.current.srcObject = stream;
		if (muted) setIsMuted(muted);
		
	}, [stream, muted, users]);

	return (
		<Container>
            <UserLabel onClick={handleMute}>
                {username}</UserLabel>
            <VideoContainer ref={ref} muted={isMuted} autoPlay volume="0.2"/>
		</Container>
	);
};

export default Audio;