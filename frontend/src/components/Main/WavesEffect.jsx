import React from 'react'
import styled, { keyframes } from 'styled-components';

const moveForeverAnimation = keyframes`
  0% {
    transform: translate3d(-90px, 0, 0);
  }
  100% {
    transform: translate3d(85px, 0, 0);
  }
`;

const WavesContainer = styled.div`
  position: relative;
  width: 100%;
  margin-bottom: -7px; /* Safari 간격 문제 해결 */

  svg {
    display: block; // SVG가 컨테이너의 전체 너비를 차지하도록 함
    position: absolute;
    bottom: 0; // 헤더 영역의 하단에 파도가 위치하도록 함
  }

  .parallax > use {
    animation: ${moveForeverAnimation} 25s cubic-bezier(.55, .5, .45, .5) infinite;
  }

  .parallax > use:nth-child(1) {
    animation-delay: -2s;
    animation-duration: 7s;
  }

  .parallax > use:nth-child(2) {
    animation-delay: -3s;
    animation-duration: 10s;
  }

  .parallax > use:nth-child(3) {
    animation-delay: -4s;
    animation-duration: 13s;
  }

  .parallax > use:nth-child(4) {
    animation-delay: -5s;
    animation-duration: 20s;
  }
`;

const WavesEffect = () => {
    return (
        <WavesContainer>
            <svg className="waves" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"
                viewBox="0 24 150 28" preserveAspectRatio="none" shapeRendering="auto">
                <defs>
                    <path id="gentle-wave"
                        // d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z" />
                        // d="M-160 44c30 0 58-10 88-10s 58 10 88 10 58-10 88-10 58 10 88 10 v44h-352z" />
                        // d="M-160 44c30 0 58-4 88-4s 58 4 88 4 58-4 88-4 58 4 88 4 v44h-352z" />
                        d="M-160 44c30 0 58-3 88-3s 58 3 88 3 58-3 88-3 58 3 88 3 v44h-352z" />
                </defs>
                <g className="parallax">
                    <use xlinkHref="#gentle-wave" x="48" y="0" fill="rgba(255,255,255,0.7" />
                    <use xlinkHref="#gentle-wave" x="48" y="3" fill="rgba(255,255,255,0.5)" />
                    <use xlinkHref="#gentle-wave" x="48" y="5" fill="rgba(255,255,255,0.3)" />
                    <use xlinkHref="#gentle-wave" x="48" y="7" fill="#fff" />
                </g>
            </svg>

        </WavesContainer>
    )
}

export default WavesEffect