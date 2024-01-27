import React from 'react'
import { useNavigate } from 'react-router-dom'

const LandingPage = () => {
    const navigate = useNavigate();    

    return (
        <div>LandingPage
            <button onClick={navigate('/mypage')}> 마이페이지 </button>
        </div>
    )
}

export default LandingPage