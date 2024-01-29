import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import login from '../api/loginApi';
import backgroundImage from '../assets/landing2.png';


const LandingPage = () => {
    const navigate = useNavigate(); 
    const [userId, setUserId] = useState('');
    const [password, setPassword] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleLogin = async (event) => {
        event.preventDefault();
        try {            
            const response = await login(userId, password);
            console.log(response); 
            
            const {
                accessToken, 
                refreshToken,
                // nickname,
                accountId
            } = response.response;
            var rand = Math.floor(Math.random() * 8);
            let nicknames;
            nicknames = ["손정원", "손원정", "이찬우", "이우찬", "김민규", "김규민", "김주영", "김영주"]

            if (accessToken && refreshToken) {
                localStorage.setItem('access', accessToken);
                localStorage.setItem('refresh', refreshToken);
                localStorage.setItem('nickname', nicknames[rand]);
                localStorage.setItem('accountId', accountId);
                
                console.log("로그인 완료");                
            
                setIsLoggedIn(true);
                
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
        <div style={{ 
            backgroundImage: `url(${backgroundImage})`, 
            backgroundSize: 'cover', 
            backgroundPosition: 'center',
            minHeight: '100vh'  // 최소 높이를 뷰포트 높이로 설정
        }}>            
            {isLoggedIn ? <div style={{color:'blue'}}> 로그인 되었습니다 </div> 
            : <div style={{color:'red'}}> 로그인을 해주세요 </div>}        
            
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