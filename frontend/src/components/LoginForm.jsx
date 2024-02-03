function LoginForm({ username, password, setUsername, setPassword, authenticate, type }) {
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
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button
        className="text-white mt-5"
        onClick={() => authenticate()}>{type}
      </button>
    </div>
  )
}

export default LoginForm