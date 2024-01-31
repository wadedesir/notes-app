import { useEffect, useState } from 'react'
import logo from '../assets/logo.png'
import AddNote from '../components/AddNote'
import axios from 'axios'

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

  return (
    <div className='container' style={{minWidth: '100vw', maxHeight: '100vh'}}>
      <img className="fixed size-40 left-5 top-0 object-contain" src={logo}/>
      <AddNote note={note} setNote={setNote} createNote={createNote} ></AddNote>
    </div>
  )
}

export default Home