/** @jsxImportSource @emotion/react */
import { useNavigate, useParams } from "react-router-dom";
import * as s from "./PostStyle";
import React, { useEffect, useMemo, useState } from 'react'
import BoardCategory from "./BoardCategory";
import { BoardDetailResponseDto } from "@/dtos/board/response/board-detail.response.dto";
import { useCookies } from "react-cookie";
import { deletePost, getPost } from "@/apis/board/board.api";
import { createCommentRequest } from "@/apis/comment/create-comment.api";
import Comment from "./comment/Comment";
import { deleteCommentRequest } from "@/apis/comment/delete-comment.api";

function Post() {
  const {postId, categoryName} = useParams<{postId: string; categoryName: string}>();
  const [isProfileBoxOpen, setProfileBoxOpen] = useState(false);
  const closeModal = () => setProfileBoxOpen(false);
  const [modalProfilePosition, setProfileModalPosition] = useState({x: 0, y: 0});
  const navigate = useNavigate();
  const [isDeleteBoxOpen, setDeleteBoxOpen] = useState(false);
  const [post, setPost] = useState<BoardDetailResponseDto | null>(null);
  const currentUserId = getUserIdFromToken();
  const [newComment, setNewComment] = useState("");
  const numericPostId = Number(postId);
  const [loadingPost, setLoadingPost] = useState(true);
  const [loadingComments, setLoadingComments] = useState(true);
  const [loadingUsernames, setLoadingUsernames] = useState(true);
  const {matchId} = useParams<{matchId: string}>();
  const match = Number(matchId);
  const [cookies, setCookies] = useCookies(["accessToken"]);


  const handleDelete = async () => {
    if(match === null || !postId || !categoryName){
      alert("필수 정보가 누락되었습니다.");
      return
    }
    try{
      const token = cookies.accessToken;
      if(!token){
        alert("로그인이 필요합니다.");
        return;
      }
      await deletePost(match, numericPostId, token);
      setDeleteBoxOpen(false);
      navigate(-1);
    } catch (error){
      alert("삭제 중 오류가 발생했습니다.");
    }
  };

  const handleProfileClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setProfileBoxOpen(true);
    setProfileModalPosition({x: e.clientX, y: e.clientY});
  };

  useEffect(() => {
    if(!categoryName || !postId || !match){
      setLoadingPost(true);
      return;
    }
    const fetchPost = async() => {
      try{
        const token = cookies.accessToken;
        if(!token) throw new Error("로그인 토큰이 없습니다.");
        const response = await getPost(match, numericPostId, token);
        
        if(response.data){
          setPost(response.data);
        }
      } catch(error){
        alert("게시글을 불러오는데 실패했습니다.");
      } finally{
        setLoadingPost(false);
      }
    };
    fetchPost();
  }, [match, categoryName, postId]);

  const handleCommentSubmit = async() => {
    if(!newComment.trim()){
      alert("댓글을 입력해주세요.");
      return;
    }
    try{
      const token = cookies.accessToken;
      if(!categoryName || !postId || match === null){
        setLoadingComments(true);
        return;
      }
      if(!token){
        alert("로그인이 필요합니다.");
        return;
      }
      const dto = {content: newComment}
      await createCommentRequest(match, numericPostId, dto, token);

      window.location.reload();
    } catch(error){
      alert("댓글 작성 중 오류가 발생했습니다.");
    }
  };

  const handleDeleteComment = async (commentId: number) => {
    try{
      const token = cookies.accessToken;
      await deleteCommentRequest(match, numericPostId, commentId, token);
      alert("댓글이 삭제되었습니다.");
    } catch(error){
      alert("댓글 삭제 실패.");
    }
  }

  if(loadingPost) return <div>게시글 불러오는 중...</div>;
  if(!post) return <div>게시글이 존재하지 않습니다.</div>;
  if(loadingComments) return <div>댓글 불러오는 중...</div>;
  if(loadingUsernames) return <div>댓글 작성자 이름 불러오는 중...</div>;

  return (
    <div>
      <div css={s.body}>
        <div css={s.left}>
          <BoardCategory category = {categoryName ?? "MEAL"} />
        </div>
        <div css={s.right}>
          <div css={s.postHeader}>
            <div onClick={handleProfileClick} css={s.profile}>
              <img 
                src='/default-profile.png' 
                alt="profile"
                onError={(e) => {
                  e.currentTarget.src = '/default-profile.png';
                }}
                css={s.loginProfile}
              />
              <div css={s.profileSub}>
                <span>{post.writerName ?? "알 수 없음"}</span>
                <span>{post.createdAt}</span>
              </div>
            </div>
            <div>
              {isProfileBoxOpen && (
                <div css={s.modalOverlay} onClick={closeModal}>
                  <div css={s.profileModal(modalProfilePosition.x, modalProfilePosition.y)} onClick={(e) => e.stopPropagation()}>
                    <img 
                      src='/default-profile.png' 
                      alt="profile"
                      onError={(e) => {
                        e.currentTarget.src = '/default-profile.png';
                      }} 
                      css={s.modalProfileImage}
                    />
                    <div css={s.profileMiddle}>
                      <div css={s.profileUser}>
                        {post.writerName ?? "알 수 없음"}
                      </div>
                      <button css={s.modalNoteBtn} onClick={() => navigate(`/notes/write?receiver=${post.writerId}`)}>쪽지</button>
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
                        <button css={s.deleteBtn} onClick={handleDelete}>예</button>
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
                {post?.boardImages?.map((img, index) => (
                  <img 
                    key={index} 
                    src={`http://localhost:8080${img.filePath}?v=${Date.now}`} 
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
            {/* <div css={s.footer}>
              <div css={s.likeImage}></div>
              <div>{post.postLike ?? 0}</div>
            </div> */}
            <div css={s.footerRight}>
              <div css={s.footer}>
                <div css={s.commentImage}></div>
                <div>{post.comments?.length ?? 0}</div>
              </div>
              <div css={s.footer}>
                <div css={s.viewImage}></div>
                <div>{post.viewCount ?? 0}</div>
              </div>
            </div>
          </div>
          <div css={s.comment}>
            {post?.comments && post.comments.length > 0 ? (
              post.comments.map((comment) => {
                return(
                  <Comment
                    key={comment.id}
                    comment={comment}
                    commenterName={comment.commenterName ?? "알수없음"}
                    profileImageUrl={comment.commenterProfileImageUrl ? `http://localhost:8080${comment.commenterProfileImageUrl}` : '/default-profile.png'}
                    onDelete={handleDeleteComment}
                  />
                );
              })
            ) : (
              <div css={s.noComment}>댓글이 없습니다.</div>
            )}
          </div>
            <div css={s.commentWrite}>
              <textarea 
                rows={2} 
                maxLength={100}
                css={s.commentWriteInput} 
                placeholder="내용을 입력해주세요." 
                value={newComment} 
                onChange={(e) => setNewComment(e.target.value)} />
              <button css={s.commentWriteBtn} onClick={handleCommentSubmit}>작성</button>
            </div>
          </div>
        </div>
      </div>
  )
}

export default Post