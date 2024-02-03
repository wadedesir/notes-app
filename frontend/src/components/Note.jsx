import { useState } from "react"

function Note({ date, content, important, editNote, deleteNote }) {

  const [tooltip, setTooltip] = useState(false)

  return (
    <div className="relative" onMouseEnter={() => setTooltip(true)} onMouseLeave={() => setTooltip(false)}>
        {(
          tooltip && <span className="absolute z-50 rounded-full bg-white text-black hover:bg-red-500 text-center flex justify-center items-center" style={{right: '-5px', top: '-10px', width: '32px', height: '32px'}} onClick={() => deleteNote()}>✖️</span>
          )}
        
        {(
          tooltip && <span className="absolute z-50 rounded-full bg-white text-black hover:bg-green-500 text-center flex justify-center items-center" style={{left: '-5px', top: '-10px', width: '32px', height: '32px'}} onClick={() => editNote()}>✏️</span>
        )}
        
      <div className={`${important ? 'bg-cyan-600' : 'bg-slate-500'} aspect-h-1 aspect-w-1 w-68 h-32 overflow-hidden rounded-md  lg:aspect-none group-hover:opacity-75 p-5`}>
        {date}
        <br></br>
        <strong>{content}</strong>
      </div>
    
    </div>
  )
}

export default Note