
function AddNote({note, setNote, createNote}) {
  return (
    <div className="mt-32 ml-10 flex justify-center">
      <input
        placeholder="I need to remember..."
        className="rounded-lg p-6 text-black w-5/6"
        type="text"
        name="note"
        value={note}
        onChange={(e) => setNote(e.target.value)}
        style={{ height: '40px' }}
      />
      <button className="ml-5" onClick={() => createNote()}>
        Add
      </button>
    </div>
  )
}

export default AddNote
