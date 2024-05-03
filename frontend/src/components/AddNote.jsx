import { useState } from "react"
import axios from 'axios'

function AddNote({note, setNote, createNote}) {

  const [prompt, setPrompt] = useState('')
  const [showInput, setShowInput] = useState(false)

  const resetInput = () => {
    setPrompt('')
    setShowInput(false)
  }

  const sendPrompt = async () => {
    if(prompt == '' || prompt.length < 8){
      alert("please input a prompt or add more text")
      return
    }

    const data = {
      prompt: prompt
    }

    let ret = ''

   await  axios.post('http://gptnotes.us-east-2.elasticbeanstalk.com:8420/v1/gpt', data)
    .then(response => {
      console.log('Completion:', response.data);
      setNote(note + ' ' + response.data.message.content)
    })
    .catch(error => {
      console.error('Error:sdsd', error.response.data);
    });

    resetInput()
  }

  return (
    <div className="mt-32 ml-10 flex justify-center items-center">
      <div className={`z-40 fixed flex justify-center items-center flex-col ${showInput ? '' : 'hidden'}`} style={{left: 0, top: 0, width: '100vw', height: '100vh', backgroundColor: "rgba(0, 0, 0, 0.5)"}}>
          <h2 className="font-bold">Prompt:</h2>
          <input value={prompt} onChange={e => setPrompt(e.target.value)} className="rounded p-2" placeholder="What text do you want the AI to add? (ask a question)" style={{width: '30vw', height: '5vh', color: 'black'}}/>
          <div>
            <button className="mt-4 mr-2" onClick={() => resetInput()}>Cancel</button>
            <button className="mt-4 ml-2" onClick={() => sendPrompt()}>Ask</button>
          </div>
      </div>

      <div className="relative w-full">
        <span className="delete hover:cursor-pointer absolute z-30 rounded-full bg-slate-500 text-black hover:bg-blue-400 text-center flex justify-center items-center" style={{right: '-5px', top: '-25px', width: '50px', height: '50px'}} onClick={() => setShowInput(true)}>🤖</span>
        <textarea
          placeholder="I need to remember..."
          className="rounded-lg p-2 text-black w-full"
          type="text"
          name="note"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          style={{ height: '200px' }}
        />
      </div>
      <button style={{height: '50px'}}className="ml-5" onClick={() => createNote()}>
        Add
      </button>
    </div>
  )
}

export default AddNote
