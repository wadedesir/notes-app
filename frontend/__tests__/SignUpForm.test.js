import '@testing-library/jest-dom'
import { render, screen, fireEvent } from '@testing-library/react'
import SignUpForm from '../src/components/SignUpForm'

describe('SignUpForm component', () => {
  // TEST #1
  test('renders SignUpForm component', () => {
    render(<SignUpForm />)
    expect(screen.getByPlaceholderText('Username')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Confirm password')).toBeInTheDocument()
  })

  // TEST #2
  test('displays error message for mismatched passwords', () => {
    render(
      <SignUpForm
        password='password'
        confirmPassword='mismatchedpassword'
      />
    )

    const passwordInput = screen.getByPlaceholderText('Password')
    const confirmPasswordInput = screen.getByPlaceholderText('Confirm password')

    fireEvent.change(passwordInput, { target: { value: 'password' } })
    fireEvent.change(confirmPasswordInput, { target: { value: 'mismatchedpassword' } })

    expect(screen.getByText('Passwords do not match')).toBeInTheDocument()
  })

  // TEST #3
  test('does not display error message when passwords match', () => {
    render(
      <SignUpForm
        password=''
        confirmPassword=''
        setPassword={jest.fn()}
        setConfirmPassword={jest.fn()}
      />
    )

    const passwordInput = screen.getByPlaceholderText('Password')
    const confirmPasswordInput = screen.getByPlaceholderText('Confirm password')

    fireEvent.change(passwordInput, { target: { value: 'password' } })
    fireEvent.change(confirmPasswordInput, { target: { value: 'password' } })

    expect(screen.queryByText('Passwords do not match')).toBeNull()
  })

  // TEST #4
  test('calls authenticate function when passwords match and button is clicked', () => {
    const mockAuthenticate = jest.fn()

    render(
      <SignUpForm
        setPassword={jest.fn()}
        setConfirmPassword={jest.fn()}
        authenticate={mockAuthenticate}
      />
    )

    const passwordInput = screen.getByPlaceholderText('Password')
    const confirmPasswordInput = screen.getByPlaceholderText('Confirm password')

    fireEvent.change(passwordInput, { target: { value: 'password' } })
    fireEvent.change(confirmPasswordInput, { target: { value: 'password' } })

    const button = screen.getByRole('button')

    fireEvent.click(button)

    expect(mockAuthenticate).toHaveBeenCalledTimes(1)
  })

  test('does not call authenticate if passwords do not match', () => {
    const mockAuthenticate = jest.fn()

    render(
      <SignUpForm
        setPassword={jest.fn()}
        setConfirmPassword={jest.fn()}
        authenticate={mockAuthenticate}
        username='username'
        password='pass' //force set username & password to be false
        confirmPassword='noMatch'
      />
    )

    const button = screen.getByRole('button')

    fireEvent.click(button)

    expect(mockAuthenticate).toHaveBeenCalledTimes(0)
  })
})
