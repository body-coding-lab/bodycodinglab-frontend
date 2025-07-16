/** @jsxImportSource @emotion/react */
import { useNavigate } from "react-router-dom";
import * as s from "./BoardTrainerPageStyle";
import React, { useEffect, useState } from 'react'

interface MatchInfo{
    matchId: number;
    memberId: number;
    memberName: string;
    memberAge: number;
    memberGender: 'MALE' | 'FEMALE';
}

function BoardTrainerPage() {
    const navigate = useNavigate();
    const [matchList, setMatchList] = useState<MatchInfo[]>([]);

    useEffect(() => {
        fetch('/api/trainer/matches', {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
            },
        })
        .then(res => res.json())
        .then(data => {
            if(data.code === '요청이 성공적으로 처리되었습니다.'){
                setMatchList(data.data);
            }
        })
        .catch(err => console.error(err));
    }, []);

    const handleSelect = (matchId: number) => {
        navigate(`/board/${matchId}`);
    }

  return (
    <div css={s.body}>
        <div css={s.boardListWrap}>
        {matchList.length === 0 ? (
            <p css={s.noMatch}>담당 중인 회원이 없습니다.</p>
        ) : (
            matchList.map((match) => (
                <div key={match.matchId} css={s.boardList}>
                    <p><strong>{match.memberName}이름</strong> ({match.memberAge}나이세 | {match.memberGender === 'MALE' ? '남' : '여'})</p>
                    <button onClick={() => handleSelect(match.matchId)}>게시판 입장</button>
                </div>
                ))
            )}
        </div>
    </div>
    
  )
}

export default BoardTrainerPage