import React from "react"
import "@testing-library/jest-dom"
import { fireEvent, render, screen} from "@testing-library/react"
import LoginForm from "../src/components/LoginForm"

describe("Tests for LoginForm Component", () => {
    //Mocks for setter and authenticate functions
    let mockSetUsername = jest.fn()
    let mockSetPassword = jest.fn()
    let mockAuth = jest.fn()

    describe("Tests for Rendering Login Form", () => {
        test("component should have inputs and button", () => {
            render(
                <LoginForm
                    username=""
                    password=""
                    setUsername={mockSetUsername}
                    setPassword={mockSetPassword}
                    authenticate={mockAuth}
                    type="Login"
                />
            )

            const usernameInput = screen.getByPlaceholderText("Username")
            const passwordInput = screen.getByPlaceholderText("Password")
            const loginButton = screen.getByText("Login")
            
            //Assertions
            expect(usernameInput).toBeInTheDocument()
            expect(passwordInput).toBeInTheDocument()
            expect(loginButton).toBeInTheDocument()
    
        })
        

    })
    
    describe("Tests for LoginForm Interactions", () => {
        //Render the loginform into container appended to document.body before each of the following tests
        beforeEach(() => {
            render(
                <LoginForm
                    username=""
                    password=""
                    setUsername={mockSetUsername}
                    setPassword={mockSetPassword}
                    authenticate={mockAuth}
                    type="Login"
                />
            )
        })
    
        //Clear mocks after each test 
        afterEach(() => {
            jest.clearAllMocks()
        })
        
        test("should call authenticate function on click event", async () => {
            const loginButton = screen.getByText("Login")
            fireEvent.click(loginButton)
    
            expect(mockAuth).toHaveBeenCalledTimes(1)
        })
    
        test("should call setUsername with value from username input", () => {
            const usernameInput = screen.getByPlaceholderText("Username")
            const testUserName = "Test_User"
    
            fireEvent.change(usernameInput, {target: {value: testUserName}})
    
            expect(mockSetUsername).toHaveBeenCalledTimes(1)
            expect(mockSetUsername).toHaveBeenCalledWith(testUserName)
        })
    
        test("should call setPassword with value from password input", () => {
            const passwordInput = screen.getByPlaceholderText("Password")
            const testPassword = "Test_Password"
    
            fireEvent.change(passwordInput, {target: {value: testPassword}})
    
            expect(mockSetPassword).toHaveBeenCalledTimes(1)
            expect(mockSetPassword).toHaveBeenCalledWith(testPassword)
        })

    })
    
})
