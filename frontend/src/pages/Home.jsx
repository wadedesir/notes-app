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
      const { data } = resp;

      const importantNotes = data.filter(d => d.important)
      const notImportantNotes = data.filter(d => !d.important)

      setNotes([...importantNotes, ...notImportantNotes])
      console.log(data)
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

  const deleteNote = (id) => {
    console.log('delete')
    axios
      .delete('http://localhost:8420/v1/notes/' + id)
      .then(resp => {
        console.log(resp)
        getNotes()
      })
  }

  const editNote = (newNote, important, id) => {
    console.log('edit')

    const noteObj = {
      'content': newNote,
      'important': important
    }

    axios
      .put('http://localhost:8420/v1/notes/' + id, noteObj)
      .then(resp => {
        console.log(resp)
        getNotes()
      })
  }

  return (
    <div data-testid="home-component" className="container" style={{ minWidth: '100vw', minHeight: '100vh', padding: '20px' }}>
      <img className="logo fixed size-40 left-5 top-0 object-contain" src={logo} alt="logo" />

      <AddNote notes={notes} note={note} setNote={setNote} createNote={createNote} />

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-8">
        {notes.map((n) => 
          <Note id={n.id} key={n.id} date={new Date(n.createdAt).toLocaleString()} content={n.content} important={n.important} editNote={editNote} deleteNote={deleteNote}/>
        )}
      </div>
    </div>
  )
}

export default Home
