function Note({ date, content, important }) {
  return (
    <div className={`${important ? 'bg-cyan-600' : 'bg-slate-500'} aspect-h-1 aspect-w-1 w-68 h-32 overflow-hidden rounded-md  lg:aspect-none group-hover:opacity-75 p-5`}>
      {date}
      <br></br>
      <strong>{content}</strong>
    </div>
  )
}

export default Note