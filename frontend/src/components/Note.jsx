import { useState } from "react"
import axios from "axios"
function Note({ id, date, content, important, editNote, deleteNote }) {
  const [note, setNote] = useState(content)
  const [editing, setEditing] = useState(false)
  const [tooltip, setTooltip] = useState(false)

  const updateNote = () => {
    editNote(note, important, id)
    setEditing(false)
  }
  const toggleImportant = () => {
    editNote(note, !important, id)
  }

  const sendPrompt = async () => {

    if(!confirm("Enhance this note with AI?")) return

    const data = {
      prompt: note
    }

   await  axios.post('http://gptnotes.us-east-2.elasticbeanstalk.com:8420/v1/gpt/enhance', data)
    .then(response => {
      console.log('Completion:', response.data);
      editNote(response.data.message.content, important, id)
    })
    .catch(error => {
      console.error('Error:sdsd', error.response.data);
    });

  }

  return (
    <div className="note relative mb-4" onMouseEnter={() => setTooltip(true)} onMouseLeave={() => setTooltip(false)}>
      {(
        tooltip && <span className="delete hover:cursor-pointer absolute z-30 rounded-full bg-white text-black hover:bg-red-400 text-center flex justify-center items-center" style={{right: '-5px', top: '-10px', width: '32px', height: '32px'}} onClick={() => deleteNote(id)}>🗑️</span>
      )}
      
      {(
        tooltip && <span id="edit_button" className="hover:cursor-pointer absolute z-30 rounded-full bg-white text-black hover:bg-green-500 text-center flex justify-center items-center" style={{left: '-5px', top: '-10px', width: '32px', height: '32px'}} onClick={() => setEditing(!editing)}>✏️</span>
      )}
      
      {(
        tooltip && <span id="pin_button" className="hover:cursor-pointer absolute z-30 rounded-full bg-white text-black hover:bg-green-500 text-center flex justify-center items-center" style={{left: '30px', top: '-10px', width: '32px', height: '32px', opacity: important ? '1' : '0.25'}} onClick={toggleImportant}>📌</span>

      )}
      <span className="delete hover:cursor-pointer absolute z-30 rounded-full bg-slate-500 text-black hover:bg-blue-400 text-center flex justify-center items-center" style={{right: '-5px', bottom: '-25px', width: '50px', height: '50px'}} onClick={() => sendPrompt()}>✨</span>

              
      <div className={`${important ? 'bg-cyan-600' : 'bg-slate-500'} aspect-h-1 aspect-w-1 w-68 h-32 overflow-y-scroll rounded-md  lg:aspect-none group-hover:opacity-75 p-5 note-bar`} style={{scrollbarColor: 'red'}}>
        {date}
        <br></br>
        {(editing ? <input className="edit-input text-black font-bold border-0 outline-none" value={note} onChange={(e) => setNote(e.target.value)}/> : <strong>{content}</strong> )}
        {(editing && <div className="text-xl hover:cursor-pointer"><span onClick={() => setEditing(false)}>✖️</span> <span onClick={() => updateNote()}>✔️</span></div>)}
        
      </div>
    
    </div>
  )
}

export default Note
