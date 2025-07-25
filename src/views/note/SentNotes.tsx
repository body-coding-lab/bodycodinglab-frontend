/** @jsxImportSource @emotion/react */
import { useNavigate } from "react-router-dom";
import * as s from "./NoteListStyle";
import React, { useEffect, useState } from 'react'
import PageNation from "@/utils/PageNation";
import { useCookies } from "react-cookie";
import { GetNoteListResponseDto } from "@/dtos/note/response/get-noteList.response.dto";
import { GetSentNoteRequest } from "@/apis/note/get-sent-note.api";

function SentNotes() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [notes, setNotes] = useState<GetNoteListResponseDto[]>([]);
    const [userMap, setUserMap] = useState<Record<number, string>>({})
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(1);
    const pageNumbers = PageNation(page, totalPages);
    const [cookies, setCookies] = useCookies(["accessToken"]);
  
    useEffect(() => {
        const fetchNotes = async () => {
            setLoading(true);
            try{
                const token = cookies.accessToken;
                if(!token) throw new Error("로그인 토큰이 없습니다.");

                const response = await GetSentNoteRequest(token, page, 20);
                setNotes(response.data ?? []);
                setTotalPages(1);

                // try{
                //     const userIds: number[] = Array.from(new Set(
                //         data.content.flatMap((note: NoteList) => [note.noteWriter, note.noteReceiver])
                //     ));
                //     const userMapData = await fetchUsernames(userIds);
                //     setUserMap(userMapData);
                // } catch(error){
                //     alert("유저 이름 불러오기 실패.");
                // }
            } catch(error){
                alert("쪽지를 가져오지 못했습니다.");
            } finally{
                setLoading(false);
            }
        };
        fetchNotes();
    }, [page]);
  
    return (
    <div>
        <div css={s.titleWrap}>
            <h3 css={s.title}>보낸 쪽지함</h3>
        </div>
        <div css={s.noteListWrap}>
            <div css={s.spanHead}>
                <span css={s.noteIdSpan}>노트 ID</span>
                <span css={s.noteContentSpan}>노트 내용</span>
                <span css={s.noteWriterSpan}>보낸사람</span>
                <span css={s.noteReceiverSpan}>받은사람</span>
                <span css={s.noteDateSpan}>작성일</span>
            </div>
            {loading ? (
                <div css={s.loading}>로딩 중...</div>
            ) : (
                notes.map((note) => (
                    <div
                        key={note.id}
                        css={s.note}
                        onClick={() => navigate(`/notes/${note.id}`)}
                    >
                        <div css={s.spans}>
                            <span css={s.noteIdSpan}>{note.id}</span>
                            <span css={s.noteContentSpan}>{note.noteText}</span>
                            <span css={s.noteWriterSpan}>{userMap[note.noteWriterName]}</span>
                            <span css={s.noteReceiverSpan}>{userMap[note.noteReceiverName]}</span>
                            <span css={s.noteDateSpan}>{new Date(note.noteCreateTime).toLocaleDateString()}</span>
                        </div>
                    </div>
                ))
            )}
        </div>
        <div css={s.page}>
            <button css={s.pageTextBtn} onClick={() => setPage(p => Math.max(p - 1, 0))} disabled={page === 0}>
                ◀
            </button>
            {pageNumbers.map((pageNumber) => (
                <button
                    key={pageNumber}
                    onClick={() => setPage(pageNumber)}
                    css={s.pageNumBtn}
                >
                    {pageNumber + 1}
                </button>
            ))}
            <button css={s.pageTextBtn} onClick={() => setPage(p => Math.max(p - 1, 0))} disabled={page === 0}>
                ▶
            </button>
        </div>
    </div>
  )
}

export default SentNotes