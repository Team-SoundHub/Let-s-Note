import React, { useState } from "react";
import tw from "tailwind-styled-components";
import Button from "../common/Button";

const ModalBackground = tw.div`
    fixed
    t-0
    l-0
    w-[100%]
    h-[100%]
    bg-rgba(0, 0, 0, 0.5);
    z-50
    items-center
    justify-center
    cursor-pointer
`;

const ModalContainer = tw.div`
  fixed
  overflow-y-auto
  overflow-x-hidden
  flex
  z-50
  justify-center
  items-center
  w-full
  md:inset-0
  h-[calc(100%-1rem)]
  max-h-full
`;

const ModalContent = tw.div`
  relative
  p-4
  w-full
  max-w-md
  max-h-full
`;

const ModalMain = tw.div`
  relative
  bg-white
  rounded-lg
  shadow
  dark:bg-gray-700
`;

const ModalHeader = tw.div`
  flex
  items-center
  justify-between
  p-4
  md:p-5
  border-b
  rounded-t
  dark:border-gray-600
`;

const ModalTitle = tw.h3`
  text-xl
  font-semibold
  text-gray-900
  dark:text-white
`;

const ModalCloseButton = tw.button`
  end-2.5
  text-gray-400
  bg-transparent
  hover:bg-gray-200
  hover:text-gray-900
  rounded-lg
  text-sm
  w-8
  h-8
  ms-auto
  inline-flex
  justify-center
  items-center
  dark:hover:bg-gray-600
  dark:hover:text-white
`;

const ModalBody = tw.div`
  p-4
  md:p-5
`;

const ModalForm = tw.form`
  space-y-4
`;

const ModalInput = tw.input`
  bg-gray-50
  border
  border-gray-300
  text-gray-900
  text-sm
  rounded-lg
  focus:ring-blue-500
  focus:border-blue-500
  block
  w-full
  p-2.5
  dark:bg-gray-600
  dark:border-gray-500
  dark:placeholder-gray-400
  dark:text-white
`;

const ErrorMessage = tw.div`
  text-red-500
  text-center
  text-xs
  my-2
`;

const LoginLink = tw.a`
  text-sm
  text-blue-700
  hover:underline
  dark:text-blue-500
`;

const textMap = {
  login: "로그인",
  register: "회원가입",
};

const AuthModal = ({ type, closeLoginModal, handleLogin, handleRegister }) => {
  const [userId, setUserId] = useState("");
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [modalType, setModalType] = useState(type);
  const text = textMap[modalType];
  const [error, setError] = useState(null);

  const handleContentClick = (event) => {
    event.stopPropagation();
  };

  const handleUserIdChange = (event) => {
    setUserId(event.target.value);
  };

  const handleNicknameChange = (event) => {
    setNickname(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handlePasswordConfirmChange = (event) => {
    setPasswordConfirm(event.target.value);
  };

  const validateRegister = () => {
    if (password !== passwordConfirm) {
      setError("비밀번호가 일치하지 않습니다");
      return;
    }

    const response = handleRegister();
    console.log(response);
  };

  return (
    <ModalBackground onClick={closeLoginModal}>
      <ModalContainer
        id="authentication-modal"
        tabIndex="-1"
        aria-hidden="true"
      >
        <ModalContent onClick={handleContentClick}>
          <ModalMain>
            <ModalHeader>
              <ModalTitle>{text}</ModalTitle>
              <ModalCloseButton onClick={closeLoginModal}>
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  ></path>
                </svg>
                <span className="sr-only">Close modal</span>
              </ModalCloseButton>
            </ModalHeader>
            <ModalBody>
              <ModalForm>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    아이디
                  </label>
                  <ModalInput
                    id="userId"
                    placeholder="name@company.com"
                    onChange={handleUserIdChange}
                    value={userId}
                    required
                  />
                </div>
                {modalType === "register" && (
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      닉네임
                    </label>
                    <ModalInput
                      id="nickname"
                      placeholder="닉네임"
                      onChange={handleNicknameChange}
                      value={nickname}
                      required
                    />
                  </div>
                )}
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    비밀번호
                  </label>
                  <ModalInput
                    type="password"
                    id="password"
                    placeholder="••••••••"
                    onChange={handlePasswordChange}
                    value={password}
                    required
                  />
                </div>
                {modalType === "register" && (
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      비밀번호 확인
                    </label>
                    <ModalInput
                      type="password"
                      id="passwordConfirm"
                      placeholder="••••••••"
                      onChange={handlePasswordConfirmChange}
                      value={passwordConfirm}
                      required
                    />
                  </div>
                )}
              </ModalForm>
              {error && <ErrorMessage>{error}</ErrorMessage>}
              <div className="flex justify-center">
                <Button
                  className="w-full"
                  onClick={
                    modalType === "login" ? handleLogin : validateRegister
                  }
                >
                  {text}
                </Button>
              </div>
              {modalType === "login" && (
                <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
                  Not registered?{" "}
                  <LoginLink
                    onClick={() => setModalType("register")}
                    className="text-blue-700 hover:underline dark:text-blue-500"
                  >
                    Create account
                  </LoginLink>
                </div>
              )}
            </ModalBody>
          </ModalMain>
        </ModalContent>
      </ModalContainer>
    </ModalBackground>
  );
};

export default AuthModal;
