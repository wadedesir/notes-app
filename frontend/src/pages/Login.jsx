import '../index.css'
import logo from '../assets/logo.png'
import { Link } from 'react-router-dom'

function Login() {
  return (
    <>
      <img className="" src={logo}/>
      <Link to={'/home'}>
        <button className='text-white'>Login</button>
      </Link>
    
    </>
  )
}

export default Login