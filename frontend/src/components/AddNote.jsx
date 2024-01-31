import React from 'react'

function AddNote({note, setNote, createNote}) {
  return (
    <div className='mt-32 ml-10'>
        <input placeholder="I need to remember to..." className="rounded-lg p-6" type="text" name="note" value={note} onChange={(e) => setNote(e.target.value)} style={{width: '90vw', height: '40px'}}/>
        <button className='ml-5' onClick={() => createNote()}>Add</button>
    </div>
  )
}

export default AddNote