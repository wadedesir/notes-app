import { useState } from "react"

function Note({ date, content, important }) {

  const [tooltip, setTooltip] = useState(false)

  return (
    <div className="relative" onMouseEnter={() => setTooltip(true)} onMouseLeave={() => setTooltip(false)}>
        {(
          tooltip && <span className="absolute z-50 border rounded-full bg-white text-black text-center flex justify-center items-center" style={{right: '-5px', top: '-10px', width: '25px', height: '25px'}}>✖️</span>
          )}
        
        {(
          tooltip && <span className="absolute z-50 border rounded-full bg-white text-black text-center flex justify-center items-center" style={{left: '-5px', top: '-10px', width: '30px', height: '30px'}}>✏️</span>
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