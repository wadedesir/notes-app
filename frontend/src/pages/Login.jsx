// import '../index.css'
import logo from '../assets/logo.png'
import { useNavigate, Link } from 'react-router-dom'
import LoginForm from '../components/LoginForm'
import { useState } from 'react'
import axios from 'axios'

function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const authenticate = () => {
    const credentials = {
      'username': username,
      'password': password
    }
    
    axios
      .post('http://localhost:8420/v1/login', credentials)
      .then(resp => {
        console.log(resp)
        if(resp.status == 200){
          localStorage.setItem('token', resp.data.token)
          navigate('/home')
        }
      })
  }

  return (
    <div className="flex items-center flex-col">
      <img className="size-1/2 object-contain" src={logo} />

      <LoginForm
        username={username}
        password={password}
        setPassword={setPassword}
        setUsername={setUsername}
        authenticate={authenticate}
        type="Login"
      />

      <p className="mt-3">Don't have an account yet?
        <strong><Link to="/signup"> Sign up here</Link></strong>.
      </p>
    </div>
  )
}

export default Login