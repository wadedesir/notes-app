import React from 'react'

function AddNote({note, setNote}) {
  return (
    <div className='mt-32 ml-10'>
        <input placeholder="I need to remember..." className="rounded-lg p-6" type="text" name="note" value={note} onChange={(e) => setNote(e.target.value)} style={{width: '85vw', height: '40px'}}/>
        <button className='ml-5'>Add</button>
    </div>
  )
}

export default AddNote