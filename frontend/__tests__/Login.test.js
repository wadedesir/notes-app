import '@testing-library/jest-dom'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { act } from 'react-dom/test-utils'
import { MemoryRouter } from 'react-router-dom'
import axios from 'axios'
import Login from '../src/pages/Login'

jest.mock('axios')

describe('Login Component', () => {

  // TEST #1
  test('renders Login component', () => {
    render(<MemoryRouter><Login /></MemoryRouter>)
  })

  // TEST #2
  test('renders Login component with logo', () => {
    render(<MemoryRouter><Login /></MemoryRouter>)
    const logoElement = screen.getByRole('img', { name: '' })
    expect(logoElement).toBeInTheDocument()
    expect(logoElement).toHaveClass('size-1/2 object-contain')
  })

  // TEST #3
  test('renders login form with input fields', () => {
    render(<MemoryRouter><Login /></MemoryRouter>)
    const usernameInput = screen.getByPlaceholderText('Username')
    const passwordInput = screen.getByPlaceholderText('Password')
    const loginButton = screen.getByRole('button', { name: 'Login' })

    expect(usernameInput).toBeInTheDocument()
    expect(passwordInput).toBeInTheDocument()
    expect(loginButton).toBeInTheDocument()
  })

  // TEST #4
  test('renders link to sign up page', () => {
    render(<MemoryRouter><Login /></MemoryRouter>)
    const signUpLink = screen.getByRole('link', { name: /Sign up here/i })

    expect(signUpLink).toBeInTheDocument()
    expect(signUpLink).toHaveAttribute('href', '/signup')
  })

  test("Correct credentials trigger successful login", async () => {

    //set mock success response
    axios.post.mockResolvedValue({status: 200, data: {token: '123'}})

    //render and grab components
    render(<MemoryRouter><Login /></MemoryRouter>)
    const username = screen.getByPlaceholderText("Username")
    const password = screen.getByPlaceholderText("Password")
    const loginButton = screen.getByText("Login")

    //launch test events
    fireEvent.change(username, { target: { value: 'username' } })
    fireEvent.change(password, { target: { value: 'password' } })
    await waitFor( async () => fireEvent.click(loginButton))

    //check if login call was made
    expect(axios.post.mock.calls.length).toBeGreaterThan(0)

    //was correct username and password provided?
    expect(axios.post.mock.calls[0][1].username).toBe('username')
    expect(axios.post.mock.calls[0][1].password).toBe('password')

  })

  test("wrong credentials result do not log in", async () => {

    //fail mock response
    axios.post.mockResolvedValue({status: 400})

    //render and grab components
    render(<MemoryRouter><Login /></MemoryRouter>)
    const username = screen.getByPlaceholderText("Username")
    const password = screen.getByPlaceholderText("Password")
    const loginButton = screen.getByText("Login")

    //launch test events
    fireEvent.change(username, { target: { value: 'username' } })
    fireEvent.change(password, { target: { value: 'password' } })
    await waitFor( async () => fireEvent.click(loginButton))

    //check if login call was made
    expect(axios.post.mock.calls.length).toBeGreaterThan(0)

  })
})