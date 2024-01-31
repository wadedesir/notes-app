function Note({ date, content }) {
  return (
    <div className="aspect-h-1 aspect-w-1 w-68 h-32 overflow-hidden rounded-md bg-gray-100 lg:aspect-none group-hover:opacity-75 p-5">
      {date}
      <br></br>
      <strong>{content}</strong>
    </div>
  )
}

export default Note