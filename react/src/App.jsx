import { useState, useEffect } from 'react'
import Note from "./components/Note"

function App() {

  const [notes, setNotes] = useState([])

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/notes')
      .then(response => response.json())
      .then(data => setNotes(data))
  }, [])

  return (
    <>
    {notes.map((note) => <Note note={note.content} key={note.id} />)}
    </>
  )
}

export default App
