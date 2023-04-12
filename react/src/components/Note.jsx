import { useCallback } from "react"
import axiosClient from "../axios"
import { debounce } from "lodash"
import Draggable from 'react-draggable'

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

    const savePosition = (data) => {
        axiosClient.put(`/notes/${note.id}`, {x_coordinate: data.x, y_coordinate: data.y})
    }
      
    return (
        <Draggable
            handle=".handle"
            onStop={savePosition}
            defaultPosition={{x: note.x_coordinate, y: note.y_coordinate}}
        >
            <div className="w-fit h-fit">
                <div className="handle text-center mt-4 cursor-move"><span className="material-icons-round">drag_handle</span></div>
                <textarea className="bg-yellow-note mx-4 mb-4 p-5 min-h-[13rem] shadow-xl resize" type="text" value={note.content} onChange={updateContent} />
            </div>
        </Draggable>
    )
}