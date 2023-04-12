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

  const handleContentChange = (noteId, noteNewContent) => {
    setNotes(oldNotes => oldNotes.map(note => note.id === noteId 
      ? {...note, content: noteNewContent} 
      : note))
  }

  return (
    <>
    {notes.map((note) => <Note note={note} key={note.id} onContentChange={handleContentChange} />)}
    </>
  )
}

export default App
