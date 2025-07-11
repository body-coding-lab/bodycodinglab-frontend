/** @jsxImportSource @emotion/react */
import React, { useState } from 'react'
import * as s from "./BoardCategoryStyle";
import { useNavigate } from 'react-router-dom';

function BoardCategory({categoryId}: {categoryId: Number}) {
    // const [ matchId, setMatchId ] = useState<number | null>(null);
    const matchId = 1;// 테스트용
    const navigate = useNavigate();

    const handleNavigate = (categoryId: number) => {
        if(!matchId) return;
        navigate(`/personal-community-boards/${matchId}/${categoryId}`);
    };
  return (
    <div>
        <div>
            <h1 css={s.head}>카테고리</h1>
        </div>
        <nav css={s.category}>
            <div css={s.categorys}>
                <div css={(categoryId === 1 ? s.useCategoryDivs : s.categoryDivs)} onClick={() => handleNavigate(1)}>식단</div>
                <div css={(categoryId === 2 ? s.useCategoryDivs : s.categoryDivs)} onClick={() => handleNavigate(2)}>루틴</div>
                <div css={(categoryId === 3 ? s.useCategoryDivs : s.categoryDivs)} onClick={() => handleNavigate(3)}>커뮤니티</div>
            </div>
        </nav>
    </div>
  )
}

export default BoardCategory