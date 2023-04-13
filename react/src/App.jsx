import { useState, useEffect } from 'react'
import Note from "./components/Note"
import axiosClient from './axios'

function App() {

  const [notes, setNotes] = useState([])

  const fetchNotes = () => {
    axiosClient.get('/notes')
    .then(response => {
      setNotes(response.data)
    })
  }

  useEffect(() => {
    fetchNotes()
  }, [])

  const handleContentChange = (noteId, noteNewContent) => {
    setNotes(oldNotes => oldNotes.map(note => note.id === noteId 
      ? {...note, content: noteNewContent} 
      : note))
  }

  const createNewNote = () => {
    axiosClient.post('/notes')
      .then(fetchNotes)
  }

  useEffect(() => {
    const handleDoubleClick = () => {
      console.log('DOUBLE CLICK')
      createNewNote()
    }
    document.body.addEventListener('dblclick', handleDoubleClick)
    return () => {
      document.body.removeEventListener('dblclick', handleDoubleClick)
    }
  }, [])

  return (
    <>
    {notes.map((note) => <Note note={note} key={note.id} onContentChange={handleContentChange} />)}
    </>
  )
}

export default App
