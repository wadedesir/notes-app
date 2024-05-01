
function AddNote({note, setNote, createNote}) {
  return (
    <div className="mt-32 ml-10 flex justify-center ">


      {/* <div className="z-50 fixed flex" style={{width: '50vw', height: '30vh',}}>
        <textarea />
      </div> */}
      <div className="z-40 fixed flex justify-center items-center flex-col" style={{left: 0, top: 0, width: '100vw', height: '100vh', backgroundColor: "rgba(0, 0, 0, 0.5)"}}>
          <textarea style={{width: '50vw', height: '30vh', color: 'black'}}/>
          <button className="mt-4">Close</button>
      </div>

      <div className="relative w-full">
        <span className="delete hover:cursor-pointer absolute z-30 rounded-full bg-slate-500 text-black hover:bg-blue-400 text-center flex justify-center items-center" style={{right: '-5px', top: '-25px', width: '50px', height: '50px'}} onClick={() => console.log('')}>🤖</span>
        <input
          placeholder="I need to remember..."
          className="rounded-lg p-6 text-black w-full"
          type="text"
          name="note"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          style={{ height: '40px' }}
        />
      </div>
      <button className="ml-5" onClick={() => createNote()}>
        Add
      </button>
    </div>
  )
}

export default AddNote
