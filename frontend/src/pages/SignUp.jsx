import '../index.css'
import logo from '../assets/logo.png'
import { useNavigate } from 'react-router-dom'
import LoginForm from '../components/LoginForm'
import { useState } from 'react'
import axios from 'axios'

function SignUp() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const authenticate = () => {
    const credentials = {
      'username': username,
      'password': password
    }
    axios 
      .post('http://localhost:8420/v1/users', credentials)
      .then(resp => {
        console.log(resp)
        if(resp.status == 201){
          navigate('/home')
        }
      })
  }

  return (
    <div className='flex items-center flex-col'>
      <img className="size-1/2 object-contain" src={logo}/>
      <LoginForm username={username} password={password} setPassword={setPassword} setUsername={setUsername} authenticate={authenticate} type="Sign Up"/>
    
    </div>
  )
}

export default SignUp