import '../index.css'
import logo from '../assets/logo.png'
import { Link } from 'react-router-dom'

function SignUp() {
  return (
    <>
    <img className="" src={logo}/>
    <Link to={'/home'}>
      <button className='text-white'>Sign Up</button>
    </Link>
  
  </>
  )
}

export default SignUp