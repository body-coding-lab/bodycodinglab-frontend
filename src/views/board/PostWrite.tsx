/** @jsxImportSource @emotion/react */
import { useParams } from "react-router-dom";
import * as s from "./WriteorEditStyle";
import React from 'react'
import BoardCategory from "./BoardCategory";

function PostWrite() {
    const {categoryId} = useParams<{categoryId: string}>();
    const parsedCategoryId = parseInt(categoryId || '1', 10);
  return (
    <div>
        <div css={s.body}>
            <div css={s.left}>
                <BoardCategory categoryId={parsedCategoryId} />
            </div>
            <WriteOrEdit isEdit={false} categoryId={parsedCategoryId} />
        </div>
    </div>
  )
}

export default PostWrite