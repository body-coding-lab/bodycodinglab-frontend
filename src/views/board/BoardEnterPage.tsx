/** @jsxImportSource @emotion/react */
import { useNavigate } from "react-router-dom";
import * as s from "./BoardEnterPageStyle";
import React, { useEffect, useState } from 'react'
import { useCookies } from "react-cookie";

interface MatchInfo{
    matchId: number;
    role: "MEMBER" | "TRAINER" | "ADMIN";
    memberName: string;
    memberGender: 'MALE' | 'FEMALE';
    memberAge: number;
}

function BoardTrainerPage() {
    const navigate = useNavigate();
    const [matchList, setMatchList] = useState<MatchInfo[]>([]);
    const [loading, setLoading] = useState(false);
    const [cookies, setCookies] = useCookies(["accessToken"]);

    useEffect(() => {
        const fetchMatchList = async () => {
            setLoading(true);
            const token = cookies.accessToken;
            if (!token){
                alert('로그인이 필요합니다.');
                setLoading(false);
                return;
            }
            const response = await `API`;
            if (response) setMatchList(response);
            setLoading(false);
        };
        fetchMatchList();
    }, [])

    const handleSelect = (matchId: number) => {
        navigate(`/board/${matchId}`);
    }

    if (loading) return <div>로딩 중...</div>
  return (
    <div css={s.body}>
        <div css={s.boardListWrap}>
        {matchList.length === 0 ? (
            <p css={s.noMatch}>매칭이 되어있지 않습니다.</p>
        ) : (
            matchList.map((match) => match.role === "MEMBER" ? (
                    <div key={match.matchId} css={s.boardList}>
                        <p>담당 트레이너</p>
                        <p><strong>{match.memberName}이름</strong> ({match.memberAge}세 | {match.memberGender === 'MALE' ? '남' : '여'})</p>
                        <button onClick={() => handleSelect(match.matchId)}>게시판 입장</button>
                    </div>
                ) : (
                    <div key={match.matchId} css={s.boardList}>
                        <p>담당 회원</p>
                        <p><strong>{match.memberName}이름</strong> ({match.memberAge}세 | {match.memberGender === 'MALE' ? '남' : '여'})</p>
                        <button onClick={() => handleSelect(match.matchId)}>게시판 입장</button>
                    </div>
                ))
            )}
        </div>
    </div>
    
  )
}

export default BoardTrainerPage