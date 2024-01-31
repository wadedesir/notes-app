import { useState } from 'react'
import logo from '../assets/logo.png'
import AddNote from '../components/AddNote'
import Note from '../components/Note'

function Home() {
  const [note, setNote] = useState('')
  const [notes, setNotes] = useState([])

  return (
    <div className="container" style={{ minWidth: '100vw', minHeight: '100vh', padding: '20px' }}>
      <img className="fixed size-40 left-5 top-0 object-contain" src={logo} alt="logo" />

      <AddNote notes={notes} setNotes={setNotes} note={note} setNote={setNote} />

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-8">
        {notes.map((n, index) => (
          <Note key={index} date={n.date} content={n.content} />
        ))}
      </div>
    </div>
  )
}

export default Home
