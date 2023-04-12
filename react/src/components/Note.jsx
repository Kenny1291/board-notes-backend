import { useCallback } from "react"
import axiosClient from "../axios"
import { debounce } from "lodash"

export default function Note({note, onContentChange}) {

    const sendUpdateRequest = useCallback(
        debounce((id, newContent) => {
        axiosClient.put(`/notes/${id}`, {content: newContent})
      }, 1000),
      [])

    const updateContent = (e) => {
        onContentChange(note.id, e.target.value)
        sendUpdateRequest(note.id, e.target.value)
    }
      
    return (
        <div>
            <input type="text" value={note.content} onChange={updateContent} />
        </div>
    )
}