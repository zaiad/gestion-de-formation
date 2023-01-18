import axios from 'axios'

const login = (user) => (dispatch)=> {
    axios.post('http://localhost:4000/api/auth/login')
}