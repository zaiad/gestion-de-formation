import { useNavigate } from "react-router-dom"


const PrivateRoute = () => {
    const navigate = useNavigate()
    const userData = JSON.parse(localStorage.getItem('login'))
    if(!userData){
        navigate('/Login')
    }
}

export default PrivateRoute