import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import login from '../api/loginApi';

const LandingPage = () => {
    const navigate = useNavigate(); 
    const [userId, setUserId] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (event) => {
        event.preventDefault();
        try {            
            const response = await login(userId, password);
            console.log(response); 
            
            const {accessToken, refreshToken} = response.response;

            if (accessToken && refreshToken) {
                localStorage.setItem('access', accessToken);
                localStorage.setItem('refresh', refreshToken);
                // localStorage.setItem('nickname', nickname);
                
                console.log("로그인 완료");

                const a = localStorage.getItem('access');
                const b = localStorage.getItem('refresh');
                console.log("access", a);
                console.log("refresh", b);
                
                // 로그인 버전 화면으로 리렌더링하기
            }            
        } catch (error) {
            console.error('로그인 오류:', error);
        }
    };

    const navigateMyPage = () => {
        navigate('/mypage');
    }

    return (
        <div>
            <h1> LandingPage </h1>
            
            <form onSubmit={handleLogin}>
                <h2>로그인</h2>
                <input 
                    type="text" 
                    placeholder="ID" 
                    value={userId} 
                    onChange={e => setUserId(e.target.value)}
                />
                <input 
                    type="password" 
                    placeholder="Password" 
                    value={password} 
                    onChange={e => setPassword(e.target.value)}
                />
                <button type="submit">로그인</button>
            </form>


            <h2> 마이페이지로 이동하기 </h2>
            <button onClick={navigateMyPage}> 마이페이지 </button>
        </div>
    )
}

export default LandingPage