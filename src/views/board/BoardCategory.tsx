/** @jsxImportSource @emotion/react */
import React, { useState } from 'react'
import * as s from "./BoardCategoryStyle";
import { useNavigate, useParams } from 'react-router-dom';

function BoardCategory({category}: {category: string}) {
    const {matchId} = useParams<{matchId: string}>();
    
    const navigate = useNavigate();

    const handleNavigate = (category: string) => {
        if(!matchId) return;
        navigate(`/personal-community-boards/${matchId}/${category}`);
    };
  return (
    <div>
        <div>
            <h1 css={s.head}>카테고리</h1>
        </div>
        <nav css={s.category}>
            <div css={s.categorys}>
                <div css={(category === 'MEAL' ? s.useCategoryDivs : s.categoryDivs)} onClick={() => handleNavigate('MEAL')}>식단</div>
                <div css={(category === 'ROUTINE' ? s.useCategoryDivs : s.categoryDivs)} onClick={() => handleNavigate('ROUTINE')}>루틴</div>
                <div css={(category === 'COMMUNITY' ? s.useCategoryDivs : s.categoryDivs)} onClick={() => handleNavigate('COMMUNITY')}>커뮤니티</div>
            </div>
        </nav>
    </div>
  )
}

export default BoardCategory