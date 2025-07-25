/** @jsxImportSource @emotion/react */
import { useParams } from "react-router-dom";
import * as s from "./WriteorEditStyle";
import React from 'react'
import BoardCategory from "./BoardCategory";
import WriteOrEdit from "./WriteOrEdit";

function PostWrite() {
    const {categoryName} = useParams<{categoryName: string}>();
  return (
    <div>
        <div css={s.body}>
            <div css={s.left}>
                <BoardCategory category={categoryName ?? "MEAL"} />
            </div>
            <WriteOrEdit isEdit={false} categoryName={categoryName ?? "MEAL"} />
        </div>
    </div>
  )
}

export default PostWrite