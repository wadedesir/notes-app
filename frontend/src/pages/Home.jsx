import { useState } from 'react'
import logo from '../assets/logo.png'
import AddNote from '../components/AddNote'

function Home() {

  const [note, setNote] = useState('')

  return (
    <div className='container' style={{minWidth: '100vw', maxHeight: '100vh'}}>
      <img className="fixed size-40 left-5 top-0 object-contain" src={logo}/>
      <AddNote note={note} setNote={setNote}></AddNote>
    </div>
  )
}

export default Home