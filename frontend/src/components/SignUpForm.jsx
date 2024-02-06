import { useState, useEffect } from 'react'

function SignUpForm({ username, password, confirmPassword, setUsername, setPassword, setConfirmPassword, authenticate, type }) {
  const [passwordMatchError, setPasswordMatchError] = useState('')

  useEffect(() => {
    if (password !== confirmPassword) {
      setPasswordMatchError('Passwords do not match')
    } else {
      setPasswordMatchError('')
    }
  }, [password, confirmPassword])

  return (
    <div className="flex flex-col items-center">
      <input
        className="p-4 rounded-lg"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      <input
        className="p-4 mt-5 rounded-lg"
        placeholder="Password"
        type="password"
        value={password}
        onChange={(e) => {
          setPassword(e.target.value)
        }}
      />

      <input
        className="p-4 mt-5 rounded-lg"
        placeholder="Confirm password"
        type="password"
        value={confirmPassword}
        onChange={(e) => {
          setConfirmPassword(e.target.value)
        }}
      />

      {passwordMatchError && <p className="text-red-500 mt-3">{passwordMatchError}</p>}

      <button
        className="text-white mt-5"
        onClick={() => {
          if (!passwordMatchError) {
            authenticate()
          }
        }}>
        {type}
      </button>
    </div>
  )
}

export default SignUpForm