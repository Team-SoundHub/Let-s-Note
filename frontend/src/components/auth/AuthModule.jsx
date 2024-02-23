import {useNavigate} from "react-router-dom";
import {refreshToken} from "../../api/authApi";

const AuthModule = async () => {
    const navigate = useNavigate();
    try{
        await refreshToken().then((response)=>{
            console.log(response);
            if(response.status == 200){
                localStorage.setItem("access", response.token);
            }else if(response.status == 401){
                alert("401 error");
                navigate("/");
            }
        });
    } catch (error){
        navigate("/");
    }
};

export default AuthModule;