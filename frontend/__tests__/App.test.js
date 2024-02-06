import React from "react"
import "@testing-library/jest-dom"
import { render, screen, waitFor } from "@testing-library/react"
import App from "../src/App"

describe("Tests for App Component", () => { 

    test("renders login page on launch", async () => {
        
        await waitFor( async () => { //waits for component states to update
            render(<App />) //renders page
        })
        const logoElement = screen.getByRole('img', { name: '' })
        const usernameInput = screen.getByPlaceholderText('Username')
        const passwordInput = screen.getByPlaceholderText('Password')
        const loginButton = await screen.findByText("Login")

        expect(logoElement).toBeInTheDocument()
        expect(usernameInput).toBeInTheDocument()
        expect(passwordInput).toBeInTheDocument()
        expect(loginButton).toBeInTheDocument()

    })
    
})
