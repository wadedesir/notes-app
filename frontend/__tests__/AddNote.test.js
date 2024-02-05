import React from "react"
import "@testing-library/jest-dom"
import { render, screen } from "@testing-library/react"
import AddNote from "../src/components/AddNote"
import userEvent from "@testing-library/user-event"
//This test suite is tests for the AddNote component - 'describe' fn is how we instantiate a test suite and the first argument is a string that describes the suite, the second is the cb function which can be another suite or test

describe("Tests for AddNote Component", () => { 

    test("component renders input and button", () => {
        //creates mock functions and variables for rendering component
        const setNote = jest.fn()
        const createNote = jest.fn()

        const note = ''

        render( //render component
            <AddNote
                note={note}
                setNote={setNote}
                createNote={createNote}
            />)

        const noteInput = screen.getByPlaceholderText("I need to remember...") //grab input field
        const addButton = screen.getByText("Add") //grab sumit button
        
        expect(noteInput).toBeInTheDocument() //checks if they exist
        expect(addButton).toBeInTheDocument()
        
    
    })
    
    test('Component updates parent state and calls handler', async () => {

        //creates mock functions for rendering component
        let setNote = jest.fn()
        let createNote = jest.fn()

        const note = ''

        render(
            <AddNote
                note={note}
                setNote={setNote}
                createNote={createNote}
            />)

        const user = userEvent.setup() //creates user event to allow interactive tests

        const input = screen.getByPlaceholderText('I need to remember...') //grabs text input
        const addButton = screen.getByText('Add')   //grabs button

        await user.type(input, 'testing a form...') //test typing in a basic input
        await user.click(addButton) //submits the the form

        expect(createNote.mock.calls).toHaveLength(1) //check if function got called
        expect(setNote.mock.calls.join('')).toBe('testing a form...') //check if correct value got recorded
    })
})
