import React from 'react'
import '@testing-library/jest-dom'
import { render, fireEvent, screen, waitFor } from '@testing-library/react'
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

  it('displays edit, delete & pin buttons on mouse hover', async () => {
    const { container } = render(<Note {...noteProps} />)
    const noteElement = screen.getByText(noteProps.content).closest('div.relative')

    // Hover over the note element to reveal its buttons
    await userEvent.hover(noteElement)

    // Check if the edit button is rendered
    const editButton = screen.getByText('✏️')
    expect(editButton).toBeInTheDocument()

    // Check if delete button is rendered
    const deleteButton = screen.getByText('🗑️')
    expect(deleteButton).toBeInTheDocument()

    // Check if pin button is rendered
    const pinButton = screen.getByText('📌')
    expect(pinButton).toBeInTheDocument()
  })

  it('hides edit, delete & pin buttons on mouse leave', async () => {
    const { container } = render(<Note {...noteProps} />)
    const noteElement = screen.getByText(noteProps.content).closest('div.relative')

    // Hover over the note element to reveal its buttons
    await userEvent.hover(noteElement)

    // Check if the edit button is rendered
    let editButton = screen.getByText('✏️')
    expect(editButton).toBeInTheDocument()

    // Check if delete button is rendered
    let deleteButton = screen.getByText('🗑️')
    expect(deleteButton).toBeInTheDocument()

    // Check if pin button is rendered
    let pinButton = screen.getByText('📌')
    expect(pinButton).toBeInTheDocument()

    await userEvent.unhover(noteElement)

    // Check if the edit button is still rendered
    editButton = screen.queryByText('✏️')
    expect(editButton).toBeNull()

    // Check if delete button is still rendered
    deleteButton = screen.queryByText('🗑️')
    expect(deleteButton).toBeNull()

    // Check if pin button is still rendered
    pinButton = screen.queryByText('📌')
    expect(pinButton).toBeNull()
  })

  it('displays modal elements when edit button is clicked', async () => {
    const { container } = render(<Note {...noteProps} />)
    const noteElement = screen.getByText(noteProps.content).closest('div.relative')

    // Hover over the note element to reveal its buttons
    await userEvent.hover(noteElement)

    // Click the edit button to trigger the modal
    fireEvent.click(screen.getByText('✏️'))

    // Check if the modal elements are rendered
    const cancelEditButton = screen.getByText('✖️')
    const saveButton = screen.getByText('✔️')
    expect(cancelEditButton).toBeInTheDocument()
    expect(saveButton).toBeInTheDocument()
  })

  it('hides modal elements after clicking save button', async () => {
    const { container } = render(<Note {...noteProps} />)
    const noteElement = screen.getByText(noteProps.content).closest('div.relative')

    // Hover over the note element to reveal its buttons
    await userEvent.hover(noteElement)

    // Click the edit button to trigger the modal
    fireEvent.click(screen.getByText('✏️'))

    // Click the save button to interact with the modal
    fireEvent.click(screen.getByText('✔️'))

    // Use waitFor to ensure that the modal elements are removed after interaction
    expect(screen.queryByText('✖️')).toBe(null)
    expect(screen.queryByText('✔️')).toBe(null)
  })

  it('hides modal elements after clicking cancel button', async () => {
    const { container } = render(<Note {...noteProps} />)
    const noteElement = screen.getByText(noteProps.content).closest('div.relative')

    // Hover over the note element to reveal its buttons
    await userEvent.hover(noteElement)

    // Click the edit button to trigger the modal
    fireEvent.click(screen.getByText('✏️'))

    // Click the save button to interact with the modal
    fireEvent.click(screen.getByText('✖️'))

    // Use waitFor to ensure that the modal elements are removed after interaction
    expect(screen.queryByText('✖️')).toBe(null)
    expect(screen.queryByText('✔️')).toBe(null)
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

    const deleteNote = screen.getByText('🗑️')
    expect(deleteNote).toBeInTheDocument()

    // calls deleteNote function on delete
    fireEvent.click(deleteNote)
    expect(mockDeleteNote).toHaveBeenCalledWith(noteProps.id)
  })

  it('allows editing and updates data after clicking save button', async () => {
    render(<Note {...noteProps} />)

    const noteElement = screen.getByText(noteProps.content).closest('div.relative')
    expect(screen.getByText(noteProps.date)).toBeInTheDocument()

    // Hover over the note element to reveal its buttons
    await userEvent.hover(noteElement)

    // Click the edit button to trigger the modal
    fireEvent.click(screen.getByText('✏️'))

    // Change the note content in the input field
    const input = screen.getByDisplayValue(noteProps.content)
    fireEvent.change(input, { target: { value: 'Updated Content' } })

    // Click the save button
    const saveButton = screen.getByText('✔️')
    fireEvent.click(saveButton)

    // Ensure data was updated
    expect(mockEditNote).toHaveBeenCalledWith('Updated Content', noteProps.important, noteProps.id)
  })

  it('displays content when not in editing mode', () => {
    const { container } = render(<Note {...noteProps} />)
    
    // Ensure that the content is displayed when not in editing mode
    expect(screen.getByText(noteProps.content)).toBeInTheDocument()
    
    // Ensure that the input field is not rendered
    expect(screen.queryByDisplayValue(noteProps.content)).toBeNull()
  })

  it('applies styling for important notes', () => {
    const importantNoteProps = { ...noteProps, important: true }
    render(<Note {...importantNoteProps} />)
    
    // Ensure that the styling for important notes is applied
    expect(screen.getByText(noteProps.date).closest('div').classList).toContain('bg-cyan-600')
  })


})