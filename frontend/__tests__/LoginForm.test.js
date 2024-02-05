import React from "react"
import "@testing-library/jest-dom"
import { render, screen } from "@testing-library/react"
import LoginForm from "../src/components/LoginForm"
import userEvent from "@testing-library/user-event"
//This test suite is tests for the LoginForm component - 'describe' fn is how we instantiate a test suite and the first argument is a string that describes the suite, the second is the cb function which can be another suite or test
describe("Tests for LoginForm Component", () => {

    //This individual test is testing whether these elements actually render. 'test' fn instantiates the test, first arg is the test description/name, second is the cb with the test
    test("component renders inputs and button", () => {
        //Mock these props as there are outside of the scope of this test. jest.fn() is a mock function that simulates the function call since the return doesn't matter, we just need placeholder props
        const mockSetUsername = jest.fn()
        const mockSetPassword = jest.fn()
        const mockAuth = jest.fn()

        //This renders the component with empty strings for the un and pw, then calls the mock setter fns
        render(
        <LoginForm
        username=""
        password=""
        setUsername={mockSetUsername}
        setPassword={mockSetPassword}
        authenticate={mockAuth}
        type="Login"
        />)

        //These variables find the elements in the dom that match the query, (finds the elem by the placeholder text and by the text in this case-there are queries for all the attributes)
        const usernameInput = screen.getByPlaceholderText("Username")
        const passwordInput = screen.getByPlaceholderText("Password")
        const loginButton = screen.getByText("Login")
        
        //Assertions- our test will only pass if all 3 of these assertions are true. We expect an elem with a placeholder text of "Username" to be in the document. 
        expect(usernameInput).toBeInTheDocument()
        expect(passwordInput).toBeInTheDocument()
        expect(loginButton).toBeInTheDocument()
        
    
    })

})
