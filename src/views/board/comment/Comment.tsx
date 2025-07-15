/** @jsxImportSource @emotion/react */
import * as s from "./CommentStyle";
import React from 'react'

function Comment({
    comment, 
    username, 
    profileImageUrl,
    onDelete,
}: {
    comment: CommentDetailData; 
    username?: string; 
    profileImageUrl: string;
    onDelete?: (commentId: number) => void;
}) {
    const handleDelete = () => {
        if(confirm("댓글을 삭제하시겠습니까?")){
            onDelete?.(comment.commentId);
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
                <div css={s.commentWriter}>{username ?? comment.commenterId}</div>
                <div css={s.createdAt}>{getRelativeTime(comment.createdAt)}</div>
            </div>
            <div css={s.commentText}>{comment.commentContent}</div>
        </div>
        <button css={s.deleteBtn} onClick={handleDelete}>삭제</button>
    </div>
  )
}

export default Comment