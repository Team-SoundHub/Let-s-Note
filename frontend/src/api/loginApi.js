import axios from 'axios';

const login = async (userId, password) => {
    try {        
        const response = await axios.post('https://letsnote-rough-wind-6773.fly.dev/api/v1/accounts/token', {
            username: userId,
            password: password
        });        
        return response.data; 
    } catch (error) {
        console.error('로그인 요청 오류:', error);        
    }
}

export default login;
