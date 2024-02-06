import React from "react"
import "@testing-library/jest-dom"
import { render, screen, fireEvent, waitFor } from "@testing-library/react"
import Home from "../src/pages/Home"
import * as axios from 'axios'

jest.mock('axios')

describe("Tests for Home Page", () => {

    beforeEach(() => {
        let notes = [
            {
                id: 'test',
                content: 'test content',
                important: true,
                createdAt: "Sun Feb 04 2024 02:15:45 GMT+0000 (Coordinated Universal Time)"
            }
        ]

        //sets mock data for regular get and post requests
        axios.get.mockResolvedValue({ data: notes });
        axios.post.mockResolvedValue({data: notes[0]})

        //will reset get request if called
        axios.delete.mockImplementation(() => {
            axios.get.mockResolvedValue({ data: [] });
            return Promise.resolve({data: notes[0]})
        })

        axios.put.mockImplementation( (endpoint, noteObj) => {
            noteObj.id = "newTest"
            noteObj.createdAt = "Sun Feb 04 2024 02:15:45 GMT+0000 (Coordinated Universal Time)"
            const newNotes = [noteObj]
            axios.get.mockResolvedValue({data: newNotes})
            return Promise.resolve({data: notes[0]})
        })

    })

    afterEach(() => {
        jest.clearAllMocks()
    })

    test("All components render", async () => {

        await waitFor( async () => { //waits for component states to update
            render(<Home />) //renders page
        })

        //grab every component from the page
        const logo = await screen.getByAltText('logo') 
        const noteInput = await screen.getByPlaceholderText("I need to remember...")
        const addButton = await screen.getByText("Add")

        //check if components exist
        expect(logo).toBeInTheDocument()
        expect(noteInput).toBeInTheDocument()
        expect(addButton).toBeInTheDocument()
    })

    test("Notes should be rendered on load", async () => {
        let component

        await waitFor( async () => { //waits for component states to update
            component = render(<Home />) //renders page
        })

        //grabs all notes
        const notes = component.container.querySelectorAll('.note')

        await waitFor(() => expect(axios.get).toHaveBeenCalled())
        await waitFor(() => expect(notes.length).toBeGreaterThan(0))
    })
    
    test("Submitting form sends correct request to backend", async () => {
        
        let component

        await waitFor( async () => { //waits for component states to update
            component = render(<Home />) //renders page
        })

        //grab inputs
        const noteInput = screen.getByPlaceholderText("I need to remember...")
        const addButton = screen.getByText("Add")

        //launches test event
        fireEvent.change(noteInput, {target: { value: 'new note'}})
        fireEvent.click(addButton)

        //checks if Post request was sent & correct data was submitted
        await waitFor(() => expect(axios.post).toHaveBeenCalledTimes(1))
        expect(axios.post.mock.calls.length).toBeGreaterThan(0)
        expect(axios.post.mock.calls[0][1].content).toBe('new note')

        //note input should be reset
        expect(noteInput.value).toBe('')
    })

    test("empty note doesn't create a new note", async () => {
               
        let component

        await waitFor( async () => { //waits for component states to update
            component = render(<Home />) //renders page
        })

        //grab inputs
        const noteInput = screen.getByPlaceholderText("I need to remember...")
        const addButton = screen.getByText("Add")

        //launches test event
        fireEvent.click(addButton)

        //checks if Post request was sent & correct data was submitted
        await waitFor(() => expect(axios.post).toHaveBeenCalledTimes(0))
        expect(axios.post.mock.calls.length).toBe(0)

        //note input should be empty still
        expect(noteInput.value).toBe('')
    })

    test("deleting note should remove note from page", async () => {
        let component

        await waitFor( async () => { //waits for component states to update
            component = render(<Home />) //renders page
        })


        //grab close button and notes
        // const closeButton = component.container.querySelector('.delete')
        let notes = component.container.querySelectorAll('.note')

        fireEvent.mouseEnter(notes[0])
        const closeButton = screen.getByText("🗑️")

        //initially there should be one note on the page
        expect(notes.length).toBe(1)

        //launches test event
        await waitFor( async () => fireEvent.click(closeButton))

        //grab updated notes value
        notes = component.container.querySelectorAll('.note')

        //did it delete??
        expect(axios.delete.mock.calls.length).toBeGreaterThan(0)
        expect(notes.length).toBe(0)
    })

    test("editing changes contents of note", async () => {
        let component

        await waitFor( async () => { //waits for component states to update
            component = render(<Home />) //renders page
        })

        //initially note value should be "test content"
        let note = await screen.findByText("test content")
        expect(note).toBeInTheDocument()

        fireEvent.mouseEnter(note)
        const editButton = screen.getByText("✏️")

        //launches test event
        await waitFor( async () => fireEvent.click(editButton))

        //grab new input textbox and submit button
        let editInput = component.container.querySelector('.edit-input')
        let submitNote = screen.getByText("✔️")

        //input new text and press the submit button
        fireEvent.change(editInput, { target: { value: 'updated note' } })
        await waitFor( async () => fireEvent.click(submitNote))
        
        //check that put request has been sent
        expect(axios.put.mock.calls.length).toBeGreaterThan(0)

        //old note should no longer be displated
        note = await screen.queryByText("test content")
        expect(note).toBe(null)

        //check if new note content is displayed on page
        const newNote = await screen.findByText("updated note")
        expect(newNote).toBeInTheDocument()

    })

})
