import React, { useState } from "react";
import styled, { keyframes } from "styled-components";

// 로그인 폼 등장 애니메이션
const fadeIn = keyframes`
  from {
    opacity: 0;    
  }
  to {
    opacity: 1;    
  }
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.3); // 어두운 배경
  backdrop-filter: blur(5px); // 블러 효과
  z-index: 1; // 로그인 박스 아래에 위치
`;

const LoginBox = styled.div`
  animation: ${fadeIn} 0.5s ease-out;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 27rem;
  /* padding: 40px; */
  padding: 2.5rem;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0 15px 25px rgba(0, 0, 0, 0.6);
  border-radius: 10px;
  z-index: 2; // 오버레이 위에 위치
  /* color: #fff; */
`;

const ButtonsContainer = styled.div`
  display: flex;
  justify-content: flex-end; // 오른쪽 정렬
  gap: 1rem; // 버튼 사이 간격
`;

const H2 = styled.h2`
  font-size: 2rem;
  font-weight: 700;
  margin: 0 0 30px;
  padding: 0;
  color: #569d94;
  text-align: center;
`;

const UserBox = styled.div`
  position: relative;
  input {
    width: 100%;
    padding: 10px 0;
    font-size: 16px;
    color: #569d94;
    margin-bottom: 30px;
    border: none;
    border-bottom: 1px solid #84c4bd;
    outline: none;
    background: transparent;
  }
  label {
    position: absolute;
    top: 0;
    left: 0;
    padding: 10px 0;
    font-size: 16px;
    color: #569d94;
    pointer-events: none;
    transition: 0.5s;
  }
  input:focus {
    box-shadow: none;
    border-bottom: 1px solid #84c4bd;
  }
  input:focus ~ label,
  input:valid ~ label {
    top: -20px;
    left: 0;
    color: #569d94;
    font-size: 12px;
  }
`;

const FormButton = styled.a`
  position: relative;
  display: inline-block;
  padding: 10px 20px;
  color: #569d94;
  font-size: 16px;
  text-decoration: none;
  text-transform: uppercase;
  overflow: hidden;
  transition: 0.5s;
  margin-top: 40px;
  letter-spacing: 4px;
  cursor: pointer;

  &::before {
    content: "";
    position: absolute;
    top: 90%;
    left: 10%;
    width: 0;
    height: 2px;
    background: #569d94;
    transition: 0.3s;
  }

  &:hover::before {
    width: 80%;
  }
`;

const FormButton2 = styled.a`
  position: relative;
  display: inline-block;
  color: #1f5fae;
  font-size: 16px;
  text-decoration: none;
  text-transform: uppercase;
  overflow: hidden;
  transition: 0.5s;
  margin-top: 5px;

  &::before {
    content: "";
    position: absolute;
    top: 95%;
    left: 0%;
    width: 0;
    height: 2px;
    background: #1f5fae;
    transition: 0.3s;
  }

  &:hover::before {
    width: 100%;
  }
`;

const LoginForm = ({ closeLoginModal, handleLogin, openRegisterModal }) => {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");

  const onChangeUserId = (e) => {
    setUserId(e.target.value);
  };

  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const onClickLogin = () => {
    handleLogin(userId, password);
  };

  const onClickRegister = () => {
    closeLoginModal();
    openRegisterModal();
  };

  return (
    <>
      <Overlay onClick={closeLoginModal} />
      <LoginBox>
        <H2>로그인</H2>
        <form>
          <UserBox>
            <input type="text" required onChange={onChangeUserId} />
            <label>아이디를 입력하세요</label>
          </UserBox>
          <UserBox>
            <input type="password" required onChange={onChangePassword} />
            <label>비밀번호를 입력하세요</label>
          </UserBox>

          <ButtonsContainer>
            <FormButton onClick={onClickRegister}>처음 왔어요</FormButton>
            <FormButton onClick={onClickLogin}>로그인</FormButton>
          </ButtonsContainer>
        </form>
      </LoginBox>
    </>
  );
};

export default LoginForm;
