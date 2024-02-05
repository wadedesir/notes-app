import React from "react"
import "@testing-library/jest-dom"
import { render, screen } from "@testing-library/react"
import AddNote from "../src/components/AddNote"
import userEvent from "@testing-library/user-event"
//This test suite is tests for the AddNote component - 'describe' fn is how we instantiate a test suite and the first argument is a string that describes the suite, the second is the cb function which can be another suite or test

describe("Tests for AddNote Component", () => {

    test("component renders input and button", () => {
        const setNote = jest.fn()
        const createNote = jest.fn()

        const note = ''

        render(
            <AddNote
                note={note}
                setNote={setNote}
                createNote={createNote}
            />)
        const noteInput = screen.getByPlaceholderText("I need to remember...")
        const addButton = screen.getByText("Add")
        
        expect(noteInput).toBeInTheDocument()
        expect(addButton).toBeInTheDocument()
        
    
    })
    
    test('Component updates parent state and calls handler', async () => {
        let setNote = jest.fn()
        let createNote = jest.fn()

        const note = ''

        render(
            <AddNote
                note={note}
                setNote={setNote}
                createNote={createNote}
            />)

        const user = userEvent.setup()

        const input = screen.getByPlaceholderText('I need to remember...')
        const addButton = screen.getByText('Add')

        await user.type(input, 'testing a form...')
        await user.click(addButton)

        expect(createNote.mock.calls).toHaveLength(1)
        expect(setNote.mock.calls.join('')).toBe('testing a form...')
    })
})
