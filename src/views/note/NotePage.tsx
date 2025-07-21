/** @jsxImportSource @emotion/react */
import * as s from "./NotePageStyle";
import React from 'react'
import NoteNav from "./NoteNav";
import AllNotes from "./Allnotes";
import NoteDetail from "./NoteDetail";
import { Routes } from "react-router-dom";


function Note() {
  return (
    <div>
        <div css={s.body}>
            <div css={s.left}>
                <NoteNav />
            </div>
            <div css={s.right}>
                <Routes>
                    <Route path="allnotes" element={<AllNotes />} />
                    <Route path="received" element={<ReceivedNotes />} />
                    <Route path="sent" element={<SentNotes />} />
                    <Route path="write" element={<WriteNotes />} />
                    <Route path=":noteId" element={<NoteDetail />} />
                    <Route path="allnotes" element={<AllNotes />} />
                </Routes>
            </div>
        </div>
    </div>
  )
}

export default Note