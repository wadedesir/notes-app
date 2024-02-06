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



  // TEST #5
  // test('form submission with valid data and successful response', async () => {
  //   axios.post.mockResolvedValue({
  //     status: 200,
  //     data: { token: 'dummyToken' },
  //   })

  //   render(<MemoryRouter><Login /></MemoryRouter>)

  //   // Simulate user input
  //   const usernameInput = screen.getByPlaceholderText('Username')
  //   const passwordInput = screen.getByPlaceholderText('Password')

  //   fireEvent.change(usernameInput, { target: { value: 'username' } })
  //   fireEvent.change(passwordInput, { target: { value: 'password' } })

  //   // Simulate form submission
  //   fireEvent.click(screen.getByRole('button', { name: 'Login' }))

  //   // Wait for axios post call to be made
  //   await waitFor(() => expect(axios.post).toHaveBeenCalledWith(
  //     'http://localhost:8420/v1/login',
  //     { username: 'username', password: 'password' }
  //   ))

  //   // Wait for the navigation to complete
  //   await waitFor(() => {
  //     // Try finding the element by data-testid
  //     const homeComponent = screen.queryByTestId('home-component')
  //     expect(homeComponent).toBeInTheDocument()
  //   }, { timeout: 5000 })
  // })

    // TEST #7
    // test('form submission with valid data and unsuccessful response', async () => {
    //   // Mock axios.post to reject with an unsuccessful response
    //   axios.post.mockRejectedValue({
    //     response: {
    //       status: 401,
    //       data: { error: 'Authentication failed' }, // Add an error message similar to a real response
    //     },
    //   })
    
    //   render(<MemoryRouter><Login /></MemoryRouter>)
    
    //   // Simulate user input
    //   const usernameInput = screen.getByPlaceholderText('Username')
    //   const passwordInput = screen.getByPlaceholderText('Password')
    
    //   fireEvent.change(usernameInput, { target: { value: 'username' } })
    //   fireEvent.change(passwordInput, { target: { value: 'password' } })
    
    //   // Simulate form submission
    //   fireEvent.click(screen.getByRole('button', { name: 'Login' }))
    
    //   // Wait for axios post call to be made
    //   await waitFor(() => expect(axios.post).toHaveBeenCalledWith(
    //     'http://localhost:8420/v1/login',
    //     { username: 'username', password: 'password' }
    //   ))
    
    //   // Wait for the error message to be displayed
    //   waitFor(() => {
    //     const errorMessage = screen.getByText('Authentication failed')
    //     expect(errorMessage).toBeInTheDocument()
    //   }, { timeout: 10000 })
    // })
})