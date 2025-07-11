/** @jsxImportSource @emotion/react */
import { useNavigate, useParams } from "react-router-dom";
import * as s from "./PostStyle";
import React, { useMemo, useState } from 'react'
import { useUserStore } from "@/stores/user.store";
import BoardCategory from "./BoardCategory";

function Post() {
  const [matchId, setMatchId] = useState<number | null>(null);
  const {postId, categoryId} = useParams<{postId: string; categoryId: string}>();
  const [isProfileBoxOpen, setProfileBoxOpen] = useState(false);
  const closeModal = () => setProfileBoxOpen(false);
  const [modalProfilePosition, setProfileModalPosition] = useState({x: 0, y: 0});
  const navigate = useNavigate();
  const [isDeleteBoxOpen, setDeleteBoxOpen] = useState(false);
  // const [post, setPost] = useState<PostDetailData | null>(null);
  const [usernameMap, setUsernameMap] = useState<Record<string, string>>({});
  // const currentUserId = getUserIdFromToken();
  const currentUserId = 1;// 테스트용 
  // const [comments, setComments] = useState<CommentDetailData[]>([]);
  const [newComment, setNewComment] = useState("");
  const numericCategoryId = Number(categoryId);
  const numericPostId = Number(postId);
  // const allUsernamesLoaded = comments.every(comment => usernameMap.hasOwnProperty(comment.commenterId.toString()));
  const [profileImageMap, setProfileImageMap] = useState<Record<number, string>>({});
  const user = useUserStore((state) => state.user);
  const [loadingPost, setLoadingPost] = useState(true);
  const [loadingComments, setLoadingComments] = useState(true);
  const [loadingUsernames, setLoadingUsernames] = useState(true);
  const [postImages, setPostImages] = useState<string[]>([]);
  // const profileImageUrl = useMemo(() => {
  //   return post?.profileImageUrl
  //     ? `http://localhost:8080${post.profileImageUrl}?v=${Date.now()}`
  //     : 'default-profile.png';
  // }, [post?.profileImageUrl]);
  const post = {
    title: "제목",
    writerId: 1,
    content: "내용",
    postLike:10,
    commentCount: 5,
    viewCount: 20
  }

  return (
    <div>
      <div css={s.body}>
        <div css={s.left}>
          <BoardCategory categoryId={numericCategoryId} />
        </div>
        <div css={s.right}>
          <div css={s.postHeader}>
            {/* <div onClick={handleProfileClick} css={s.profile}>
              <img 
                src={profileImageUrl} 
                alt="profile"
                onError={(e) => {
                  e.currentTarget.src = '/default-profile.png';
                }}
                css={s.loginProfile}
              />
              <div css={s.profileSub}>
                <span>{post.writerId ? usernameMap[post.writerId] ?? post.writerId: "알 수 없음"}</span>
                <span>{post.createdAt}</span>
              </div>
            </div> */}
            <div>
              {isProfileBoxOpen && (
                <div css={s.modalOverlay} onClick={closeModal}>
                  <div css={s.profileModal(modalProfilePosition.x, modalProfilePosition.y)} onClick={(e) => e.stopPropagation()}>
                    {/* <img 
                      src={profileImageUrl} 
                      alt="profile"
                      onError={(e) => {
                        e.currentTarget.src = '/default-profile.png';
                      }} 
                      css={s.modalProfileImage}
                    /> */}
                    <div css={s.profileMiddle}>
                      <div css={s.profileUser}>
                        {post.writerId ? usernameMap[post.writerId] ?? post.writerId: "알 수 없음"}
                      </div>
                      <button css={s.s.modalNoteBtn} onClick={() => navigate(`/notes/write?receiver=${post.writerId}`)}>쪽지</button>
                    </div>
                    <div css={s.searchWriter}>작성글 검색</div>
                    <button css={s.closeBtn} onClick={closeModal}>X</button>
                  </div>
                </div>
              )}
            </div>
            <h3 css={s.title}>{post.title}</h3>
            {post.writerId != currentUserId ? null : (
              <div css={s.postHeaderBtns}>
                <button css={s.postHeaderBtn} onClick={()=> navigate(`./edit`)}>수정</button>
                <button css={s.postHeaderBtn} onClick={()=> setDeleteBoxOpen(true)}>삭제</button>
                {isDeleteBoxOpen && (
                  <div css={s.modalOverlay} onClick={() => setDeleteBoxOpen(false)}>
                    <div css={s.deleteModal} onClick={e => e.stopPropagation()}>
                      <p css={s.deleteText}>게시글을 삭제합니다.</p>
                      <div css={s.deleteBtns}>
                        {/* <button css={s.deleteBtn} onClick={handleDelete}>예</button> */}
                        <button css={s.deleteBtn} onClick={() => setDeleteBoxOpen(false)}>아니요</button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
          <div css={s.postContent}>
            <div css={s.contentText}>
              <div css={s.imageList}>
                {postImages.map((url, index) => (
                  <img 
                    key={index} 
                    src={`${url}?v=${Date.now}`} 
                    alt={`post-img-${index}`} 
                    css={s.postImage}
                    onError={(e) => e.currentTarget.src = '/default-image.png'}
                  />
                ))}
                {post.content}
              </div>
            </div>
            <div css={s.postLike}></div>
          </div>
          <div css={s.postFooter}>
            <div css={s.footer}>
              <div css={s.likeImage}></div>
              <div>{post.postLike ?? 0}</div>
            </div>
            <div css={s.footerRight}>
              <div css={s.footer}>
                <div css={s.commentImage}></div>
                <div>{post.commentCount ?? 0}</div>
              </div>
              <div css={s.footer}>
                <div css={s.viewImage}></div>
                <div>{post.viewCount ?? 0}</div>
              </div>
            </div>
          </div>
          <div css={s.comment}>
            {/* {comments && comments.length > 0 ? (
              comments.map((comment) => {
                const commenterIdStr = comment.commenterId.toString();
                return(
                  <Comment
                    key={comment.id}
                    comment={comment}
                    username={usernameMap[commenterIdStr] ?? `#${commenterIdStr}`}
                    profileImageUrl={profileImageMap[comment.commenterId] ?? '/default-profile.png'}
                  />
                );
              })
            ) : (
              <div css={s.noComment}>댓글이 없습니다.</div>
            )} */}
          </div>
            <div css={s.commentWrite}>
              <textarea 
                rows={2} 
                maxLength={100}
                css={s.commentWriteInput} 
                placeholder="내용을 입력해주세요." 
                value={newComment} 
                onChange={(e) => setNewComment(e.target.value)} />
              {/* <button css={s.commentWriteBtn} onClick={handleCommentSubmit}>작성</button> */}
            </div>
          </div>
        </div>
      </div>
  )
}

export default Post