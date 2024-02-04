import axios from 'axios';

const login = async (userId, password) => {
    try {        
        const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/accounts/token`, {
            username: userId,
            password: password
        });        
        return response.data; 
    } catch (error) {
        console.error('로그인 요청 오류:', error);        
    }
}

export default login;
