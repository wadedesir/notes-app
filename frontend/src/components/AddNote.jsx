function AddNote({ notes, setNotes, note, setNote }) {
  const addNote = () => {
    if (note.trim() !== '') {
      setNotes([...notes, { date: new Date().toLocaleString(), content: note }])
      setNote('')
    }
  }

  return (
    <div className="mt-32 ml-10">
      <input
        placeholder="I need to remember..."
        className="rounded-lg p-6"
        type="text"
        name="note"
        value={note}
        onChange={(e) => setNote(e.target.value)}
        style={{ width: '85vw', height: '40px' }}
      />
      <button className="ml-5" onClick={addNote}>
        Add
      </button>
    </div>
  )
}

export default AddNote
