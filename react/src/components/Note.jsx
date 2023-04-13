import { useCallback, useEffect, useRef } from "react"
import axiosClient from "../axios"
import { debounce, entries } from "lodash"
import Draggable from 'react-draggable'

export default function Note({note, onContentChange}) {

    const textareaRef = useRef(null)

    const sendUpdateRequest = useCallback(
        debounce((id, obj) => {
        axiosClient.put(`/notes/${id}`, obj)
      }, 1000),
      [])

    const updateContent = (e) => {
        onContentChange(note.id, e.target.value)
        sendUpdateRequest(note.id, {content: e.target.value})
    }

    //e arg is required to maintain correct position on page load...
    const savePosition = (e, data) => {
        axiosClient.put(`/notes/${note.id}`, {x_coordinate: data.x, y_coordinate: data.y})
    }

    useEffect(() => {
        const resizeObserver = new ResizeObserver((entries) => {
            const entry = entries[0]
            sendUpdateRequest(note.id, {width: entry.borderBoxSize[0].inlineSize, height: entry.contentRect.height})
        })
        resizeObserver.observe(textareaRef.current)
        return () => {
            resizeObserver.disconnect()
        }
    }, [])

    useEffect(() => {
        textareaRef.current.style.width = `${note.width}px`
        textareaRef.current.style.height = `${note.height}px`
    })
      
    return (
        <Draggable
            handle=".handle"
            onStop={savePosition}
            defaultPosition={{x: note.x_coordinate, y: note.y_coordinate}}
        >
            <div className="w-fit h-fit">
                <div className="handle text-center mt-4 cursor-move"><span className="material-icons-round">drag_handle</span></div>
                <textarea className="bg-yellow-note mx-4 mb-4 p-5 min-h-[13rem] shadow-xl resize" type="text" value={note.content} onChange={updateContent} ref={textareaRef} />
            </div>
        </Draggable>
    )
}