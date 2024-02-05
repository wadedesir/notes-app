import React from 'react'
import '@testing-library/jest-dom'
import { render, fireEvent, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Note from '../src/components/Note'

describe('Tests for Note Component', () => {

    // Mock functions for the callbacks passed as props
    const mockEditNote = jest.fn()
    const mockDeleteNote = jest.fn()

    // Basic properties for the Note component
    const noteProps = {
        id: '1',
        date: '2024-02-04',
        content: 'Test Note Content',
        important: false,
        editNote: mockEditNote,
        deleteNote: mockDeleteNote,
    }
    
    it('renders without crashing', () => {
        render(<Note {...noteProps} />)
        expect(screen.getByText(noteProps.content)).toBeInTheDocument()
    })

    it('displays the date', () => {
        render(<Note {...noteProps} />)
        expect(screen.getByText(noteProps.date)).toBeInTheDocument()
    })

    it('popup modal shows on mouse enter', async () => {
        const { container } = render(<Note {...noteProps} />)
        const noteElement = screen.getByText(noteProps.content).closest('div.relative')        
        await userEvent.hover(noteElement)
        const editButton = screen.getByText('✏️')
        fireEvent.click(editButton)
        const cancelEditButton = container.querySelector('.cancel-edit-button')
        await userEvent.unhover(noteElement)
        await userEvent.click(cancelEditButton)
    })

    it('can be marked as important/unimportant via the 📌 toggle', async () => {
        render(<Note {...noteProps} />)
        const noteElement = screen.getByText(noteProps.content).closest('div.relative')
        expect(screen.getByText(noteProps.date)).toBeInTheDocument()
        
        await userEvent.hover(noteElement) // Hover over the note element to reveal the its buttons
        
        const toggleImportant = screen.getByText('📌')
        expect(toggleImportant).toBeInTheDocument()
        // confirm the importance is toggled on and off upon clicking the importance button
        await userEvent.click(toggleImportant)
        expect(mockEditNote).toHaveBeenCalledWith(noteProps.content, true, noteProps.id)
        await userEvent.click(toggleImportant)
        expect(mockEditNote).toHaveBeenCalledWith(noteProps.content, false, noteProps.id)
    })

    it('can be deleted', async () => {
        render(<Note {...noteProps} />)
        const noteElement = screen.getByText(noteProps.content).closest('div.relative')
        await userEvent.hover(noteElement) // Hover over the note element to reveal the its buttons
        
        const deleteNote = screen.getByText('✖️')
        expect(deleteNote).toBeInTheDocument()
        
        // calls deleteNote function on delete
        fireEvent.click(deleteNote)
        expect(mockDeleteNote).toHaveBeenCalledWith(noteProps.id)
    })

    it('shows edit button on hovering and allows editting', async () => {
        render(<Note {...noteProps} />)
        
        const noteElement = screen.getByText(noteProps.content).closest('div.relative')
        expect(screen.getByText(noteProps.date)).toBeInTheDocument()
        
        await userEvent.hover(noteElement) // Hover over the note element to reveal the its buttons

        const editButton = screen.getByText('✏️')
        fireEvent.click(editButton)

        // Change the note content in the input field
        const input = screen.getByDisplayValue(noteProps.content)
        fireEvent.change(input, { target: { value: 'Updated Content' } })

        // Click the save button
        const saveButton = screen.getByText('✔️')
        fireEvent.click(saveButton)

        // ensure data was updated
        expect(mockEditNote).toHaveBeenCalledWith('Updated Content', noteProps.important, noteProps.id)
    })
})