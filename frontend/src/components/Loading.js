import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  margin: auto;
  width: 100vw;
  height: 100vh;
  background-color: #232323;
  text-align: center;
  font-size: 10px;

  & > div {
    background-color: #363636;
    height: 100%;
    width: 35px;
    margin: 5px;
    display: inline-block;

    -webkit-animation: sk-stretchdelay 1.2s infinite ease-in-out;
    animation: sk-stretchdelay 1.2s infinite ease-in-out;
  }

  & .rect2 {
    -webkit-animation-delay: -1.1s;
    animation-delay: -1.1s;
  }

  & .rect3 {
    -webkit-animation-delay: -1.0s;
    animation-delay: -1.0s;
  }

  & .rect4 {
    -webkit-animation-delay: -0.9s;
    animation-delay: -0.9s;
  }

  & .rect5 {
    -webkit-animation-delay: -0.8s;
    animation-delay: -0.8s;
  }

  @-webkit-keyframes sk-stretchdelay {
    0%, 40%, 100% { -webkit-transform: scaleY(0.2) }  
    20% { -webkit-transform: scaleY(0.7) }
  }

  @keyframes sk-stretchdelay {
    0%, 40%, 100% { 
      transform: scaleY(0.2);
      -webkit-transform: scaleY(0.2);
    }  20% { 
      transform: scaleY(0.7);
      -webkit-transform: scaleY(0.7);
    }
  }
`

const Loading = () => (
  <Container>
    <div className='rect1' />
    <div className='rect2' />
    <div className='rect3' />
    <div className='rect4' />
    <div className='rect5' />
  </Container>
)

export default Loading
