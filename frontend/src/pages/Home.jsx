import { useEffect, useState } from 'react'
import logo from '../assets/logo.png'
import AddNote from '../components/AddNote'
import axios from 'axios'
import Note from '../components/Note'

function Home() {
  const [note, setNote] = useState('')
  const [notes, setNotes] = useState([])

  useEffect(() => {
    getNotes()
  }, [])

  const getNotes = () => {
    axios
    .get('http://localhost:8420/v1/notes')
    .then(resp => {
      setNotes(resp.data)
      console.log(resp.data)
    })
  }

  const createNote = () => {
    if(note == ''){
      return
    }

    const noteObj = {
      'content': note,
      'important': false
    }

    const headers = {'Authorization': 'Bearer ' + localStorage.token}

    axios
      .post('http://localhost:8420/v1/notes', noteObj, {headers})
      .then(resp => {
        console.log(resp)
        getNotes()
      })

    setNote('')
  }

  const deleteNote = () => {

  }

  const editNote = () => {

  }

  return (
    <div className="container" style={{ minWidth: '100vw', minHeight: '100vh', padding: '20px' }}>
      <img className="fixed size-40 left-5 top-0 object-contain" src={logo} alt="logo" />

    <AddNote notes={notes} note={note} setNote={setNote} createNote={createNote} />

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-8">
        {notes.map((n, index) => (
          <Note key={index} date={new Date(n.createdAt).toLocaleString()} content={n.content} important={n.important} />
        ))}
      </div>
    </div>
  )
}

export default Home
