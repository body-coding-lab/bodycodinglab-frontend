/** @jsxImportSource @emotion/react */
import getRelativeTime from "@/utils/GetRelativeTime";
import * as s from "./CommentStyle";
import React from 'react'
import { GetCommentResponseDto } from "@/dtos/comment/response/get-comment.response.dto";

function Comment({
    comment, 
    commenterName, 
    profileImageUrl,
    onDelete,
}: {
    comment: GetCommentResponseDto; 
    commenterName?: string; 
    profileImageUrl: string;
    onDelete?: (id: number) => void;
}) {
    const handleDelete = () => {
        if(confirm("댓글을 삭제하시겠습니까?")){
            onDelete?.(comment.id);
        }
    }

    return (
    <div css={s.wrap}>
        <img 
            css={s.profileImage}
            src={profileImageUrl ?? '/default-profile.png'} 
            alt="profile" 
        />
        <div css={s.commentContentBox}>
            <div css={s.commentInfoBox}>
                <div css={s.commentWriter}>{commenterName ?? "알수없음"}</div>
                <div css={s.createdAt}>{getRelativeTime(comment.createdAt)}</div>
            </div>
            <div css={s.commentText}>{comment.content}</div>
        </div>
        <button css={s.deleteBtn} onClick={handleDelete}>삭제</button>
    </div>
  )
}

export default Comment