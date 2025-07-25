/** @jsxImportSource @emotion/react */
import { useNavigate } from "react-router-dom";
import * as s from "./BoardEnterPageStyle";
import React, { useEffect, useState } from 'react'
import { useCookies } from "react-cookie";
import { GetUserMatchListRequest } from "@/apis/match/get-user-matchList.api";

interface MatchInfo{
    matchId: number;
    role: "MEMBER" | "TRAINER" | "ADMIN";
    name: string;
    gender: 'MALE' | 'FEMALE';
    age: number;
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
            try{
                 const response = await GetUserMatchListRequest(token);
                if (response && response.data) {
                    setMatchList(response.data);
                }else{
                    alert('매칭 정보를 불러올 수 없습니다.');
                }
            } catch(e){
                alert('오류가 발생했습니다.');
            }
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
                        <p><strong>{match.name}이름</strong> ({match.age}세 | {match.gender === 'MALE' ? '남' : '여'})</p>
                        <button onClick={() => handleSelect(match.matchId)}>게시판 입장</button>
                    </div>
                ) : (
                    <div key={match.matchId} css={s.boardList}>
                        <p>담당 회원</p>
                        <p><strong>{match.name}이름</strong> ({match.age}세 | {match.gender === 'MALE' ? '남' : '여'})</p>
                        <button onClick={() => handleSelect(match.matchId)}>게시판 입장</button>
                    </div>
                ))
            )}
        </div>
    </div>
    
  )
}

export default BoardTrainerPage