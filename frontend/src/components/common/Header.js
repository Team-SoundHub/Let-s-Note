import React from "react";
import { Link } from "react-router-dom";
import tw from "tailwind-styled-components";
import Button from "./Button";
import search from "../../assets/control/SearchIcon.svg";
import { useLocation } from 'react-router-dom';

const HeaderBlock = tw.div`
  z-[9999]
  fixed
  w-full
  bg-white
  shadow-md
`;

const Wrapper = tw.div`
  h-16 
  flex 
  items-center 
  justify-between
`;

const Spacer = tw.div`
  h-16
`;

const UserInfo = tw.div`
  font-bold
  mr-4
`;

const SearchForm = (
  <form className="flex w-full items-center justify-center">
    <div className="flex w-full items-center mr-2">
      <input
        className="rounded w-full h-8 text-gray-700 focus:border-[#49C5B6] placeholder-gray-500"
        type="text"
        placeholder="Search"
      />
    </div>
    <Button>
      <img src={search} alt="Search" className="w-5 h-5" />
    </Button>
  </form>
);

const Header = ({ userId, handleLogout, openLoginModal, openAccountInfoModal }) => {
    const location = useLocation();
  return (
      <>
          <HeaderBlock>
              <Wrapper>
                  <Link to="/" className="ml-5 text-2xl font-bold">
                      Let's Note
                  </Link>
                  <div className="flex items-center justify-center w-[40%]">
                      {SearchForm}
                  </div>
                  {sessionStorage.getItem("access") ? (
                      <div className="flex items-center">
                          {location.pathname === "/mypage" && (
                              <Button onClick={openAccountInfoModal}>회원정보</Button>
                          )}
                          <Button to="/mypage">마이페이지</Button>
                          <Button onClick={handleLogout}>로그아웃</Button>
                      </div>
                  ) : (
                      <div className="mr-5">
                          <Button onClick={openLoginModal}>로그인</Button>
                      </div>
                  )}
              </Wrapper>
          </HeaderBlock>
          <Spacer />
      </>
  );
};

export default Header;
