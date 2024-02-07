import axios from "axios";

export const login = async (userId, password) => {
  try {
    console.log("called");
    const response = await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/accounts/token`,
      {
        username: userId,
        password: password,
      }
    );
    return response.data;
  } catch (error) {
    console.error("로그인 요청 오류:", error);
  }
};

export const register = async (userId, nickname, password) => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/members/signup`,
      {
        username: userId,
        nickname: nickname,
        password: password,
      }
    );
    return response.data;
  } catch (error) {
    console.error("회원가입 요청 오류:", error);
  }
};
