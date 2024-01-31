import React from "react";
import { Link } from "react-router-dom";
import tw from "tailwind-styled-components";
import Button from "./Button";
import search from "../../assets/control/SearchIcon.svg";

const HeaderBlock = tw.div`
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

const Header = ({ userId, onLogout, openLoginModal }) => {
  return (
    <>
      <HeaderBlock>
        <Wrapper>
          <Link to="/" className="logo ml-2">
            Let's Note
          </Link>
          <div className="flex items-center justify-center w-[50%]">
            {SearchForm}
          </div>
          {userId ? (
            <div className="flex items-center">
              <UserInfo>{userId}</UserInfo>
              <Button to="/mypage">마이페이지</Button>
            </div>
          ) : (
            <div>
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
