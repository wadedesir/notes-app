// import '../index.css'
import logo from '../assets/logo.png'
import { useNavigate, Link } from 'react-router-dom'
import SignUpForm from '../components/SignUpForm'
import { useState } from 'react'
import axios from 'axios'

function SignUp() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
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
          navigate('/login')
        }
      })
  }

  return (
    <div className="flex items-center flex-col">
      <img className="size-1/2 object-contain" src={logo}/>

      <SignUpForm
        username={username}
        password={password}
        confirmPassword={confirmPassword}
        setPassword={setPassword}
        setUsername={setUsername}
        setConfirmPassword={setConfirmPassword}
        authenticate={authenticate}
        type="Sign Up"
      />

      <p className="mt-3">Already have an account?
        <strong><Link to="/login"> Sign in here</Link></strong>.
      </p>
    </div>
  )
}

export default SignUp