import '@testing-library/jest-dom'
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import axios from 'axios'
import SignUp from '../src/pages/SignUp'

jest.mock('../src/assets/logo.png', () => './__mocks__/logoMock.js')
jest.mock('axios')

describe('SignUp Component', () => {
  beforeEach(() => {
    jest.useFakeTimers()
    jest.clearAllMocks() // Clear mocks before each test
  })

  afterEach(() => {
    jest.clearAllTimers()
  })

  // TEST #1
  test('renders SignUp component', () => {
    render(<MemoryRouter><SignUp /></MemoryRouter>)
    expect(screen.getByText(/Already have an account/i)).toBeInTheDocument()
  })

  // TEST #2
  test('renders SignUp component with logo', () => {
    render(<MemoryRouter><SignUp /></MemoryRouter>)
    const logoElement = screen.getByRole('img', { name: '' })
    expect(logoElement).toBeInTheDocument()
    expect(logoElement).toHaveClass('size-1/2 object-contain')
    expect(logoElement).toHaveAttribute('src', './__mocks__/logoMock.js')
  })

  // TEST #3
  test('form submission with valid data and successful response', async () => {
    axios.post.mockResolvedValueOnce({ status: 201 })

    render(<MemoryRouter><SignUp /></MemoryRouter>)

    // Simulate user input
    const usernameInput = screen.getByPlaceholderText('Username')
    const passwordInput = screen.getByPlaceholderText('Password')
    const confirmPasswordInput = screen.getByPlaceholderText('Confirm password')

    fireEvent.change(usernameInput, { target: { value: 'user' } })
    fireEvent.change(passwordInput, { target: { value: 'password' } })
    fireEvent.change(confirmPasswordInput, { target: { value: 'password' } })

    // Simulate form submission
    fireEvent.click(screen.getByRole('button', { name: 'Sign Up' }))

    // Wait for axios post call to be made
    await waitFor(() => expect(axios.post).toHaveBeenCalledTimes(1))

    // Expect navigation to /login
    const loginLink = screen.getByText(/Already have an account?/).closest('p').querySelector('a')
    expect(loginLink).toHaveAttribute('href', '/login')
  })

// TEST #4
})