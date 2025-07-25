/** @jsxImportSource @emotion/react */
import { useNavigate, useParams } from "react-router-dom";
import * as s from "./NoteListStyle";
import React, { useEffect, useState } from 'react'
import { getUserIdFromToken } from "@/apis/getUserIdFromToken";
import { useCookies } from "react-cookie";
import { GetNoteRequest } from "@/apis/note/get-note.api";

function NoteDetail() {
    const navigate = useNavigate();
    const {noteId} = useParams<{noteId: string}>();
    const [note, setNote] = useState<NoteType | null>(null);
    const [loading, setLoading] = useState(true);
    const [userMap, setUserMap] = useState<Record<number, string>>({});
    const [profileImageMap, setProfileImageMap] = useState<Record<number, string>>({});
    const userId = getUserIdFromToken();
    const isWriter = userId === note.noteWriter;
    const [cookies, setCookies] = useCookies(["accessToken"]);

    useEffect(() => {
        if(!noteId)return;

        const fetchNote = async() => {
            try{
                const token = cookies.accessToken;
                if(!token) throw new Error("토큰이 없습니다");

                const response = await GetNoteRequest(token, Number(noteId));
                setNote(response);
                const userIds: number[] = [response.data?.noteWriterName!, response.data?.noteReceiverName!];
                // const userMapData = await fetchUsernames(userIds);
                // const profileUrls = await fetchProfileImageUrls(userIds);
                // setProfileImageMap(profileUrls);
                // setUserMap(userMapData)
            } catch(error){
                alert("쪽지를 불러오지 못했습니다.");
            } finally{
                setLoading(false);
            }
        };
        fetchNote();
    }, [noteId]);

    if(loading) return <div css={s.loading}>로딩 중...</div>
    if(!note) return <div>쪽지를 찾을 수 없습니다.</div>
  return (
    <div>
        <div css={s.titleWrap}>
            <h3>쪽지 상세 조회</h3>
        </div>
        <div css={s.noteWriteWrap}>
            <div css={s.profile}>
                {isWriter ? (
                    <div css={s.profileDetail}>
                        <img 
                            css={s.profileImage}
                            src={profileImageMap[note.noteReceiver] || "default-profule.png"}
                            alt="받은 사람 프로필"
                            onError={(e) => {e.currentTarget.src = "/default-prifule.png"}} 
                        />
                        <span css={s.profileSpan}>받은 사람: {userMap[note.noteReceiver]}</span>
                    </div>
                ) : (
                    <div css={s.profileDetail}>
                        <img 
                            css={s.profileImage}
                            src={profileImageMap[note.noteWriter] || "default-profule.png"}
                            alt="보낸 사람 프로필"
                            onError={(e) => {e.currentTarget.src = "/default-prifule.png"}} 
                        />
                        <span css={s.profileSpan}>보낸 사람: {userMap[note.noteWriter]}</span>
                    </div>
                )}
                <div>{new Date(note.noteCreateTime).toLocaleString()}</div>
            </div>
        </div>
        <div css={s.noteText}>{note.noteText}</div>
        {isWriter ? <></> : <button css={s.sendBtn} onClick={() => navigate(`/notes/write?receiver=${note.noteWriter}`)}>답장하기</button>}
    </div>
  )
}

export default NoteDetail