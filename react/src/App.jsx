import { useState, useEffect } from 'react'
import Note from "./components/Note"
import axiosClient from './axios'

function App() {

  const [notes, setNotes] = useState([])

  useEffect(() => {
    axiosClient.get('/notes')
      .then(response => {
        setNotes(response.data)
      })
  }, [])

  return (
    <>
    {notes.map((note) => <Note note={note} key={note.id} />)}
    </>
  )
}

export default App
