import React, { useEffect, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom';

function RedirectToUserMatch() {
    // const [ userMatchId, setUserMatchId ] = useState<number | null | undefined>(undefined);
    const navigate = useNavigate();

    // useEffect(() => {
    //     async function fetchMatchId() {
    //         const id = await getUserMatchId();
    //         if(!id){
    //             navigate('/');
    //             alert("매칭 정보가 없습니다!");
    //             return;
    //         }
    //         setUserMatchId(id);
    //     }
    //     fetchMatchId();
    // }, [navigate]);
    const userMatchId = 1;//테스트용 코드
  return <Navigate to = {`/personal-community-boards/${userMatchId}/1`}/>
}

export default RedirectToUserMatch