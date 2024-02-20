import axios from "axios";
import Swal from "sweetalert2";

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

    Swal.fire({
      icon: "success",
      title: "환영합니다!",
      showConfirmButton: false,
      timer: 1500      
    });
    return response.data;
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "로그인에 실패했어요",
      text: "아이디 혹은 비밀번호를 다시 확인해주세요",
      showConfirmButton: false,      
      timer: 1500
    });
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
    Swal.fire({
      icon: "error",
      title: "회원가입에 실패했어요",
      text: "아이디 혹은 닉네임이 이미 존재해요",
      showConfirmButton: false,
      timer: 1500
    });
    console.error("회원가입 요청 오류:", error);
  }
};
