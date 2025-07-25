/** @jsxImportSource @emotion/react */
import { useNavigate, useParams } from "react-router-dom";
import * as s from "./BoardStyle";
import React, { useEffect, useState } from 'react'
import BoardCategory from "./BoardCategory";
import PageNation from "@/utils/PageNation";
import { getPostList } from "@/apis/board/board.api";
import { BoardListResponseDto } from "@/dtos/board/response/board-list.response.dto";
import { useCookies } from "react-cookie";

function Board() {
    const navigate = useNavigate();
    const [ loading, setLoading] = useState(true);
    const [ posts, setPosts ] = useState<BoardListResponseDto[]>([]);
    const { categoryName } = useParams<{categoryName: string}>();
    const [ page, setPage ] = useState(0);
    const [ totalPages, setTotalPages ] = useState(1);
    const pageNumbers = PageNation(page, totalPages);
    const [cookies, setCookies] = useCookies(["accessToken"]);
    const {matchId} = useParams<{matchId: string}>();
    const match = Number(matchId);

    useEffect(() => {
        if(!categoryName || !match ){
            setLoading(true);
            return;
        }
        const getPosts = async () => { 
            try {
                setLoading(true);
                const token = cookies.accessToken;
                if (!token) throw new Error("로그인 토큰이 없습니다.");

                const response = await getPostList(match, token, categoryName ,page, 20);
                if (response.data){
                    setPosts(response.data.content);
                    setTotalPages(response.data.totalPages);
                }
                
            } catch (e: any){
                if(e.status === 403){
                    alert("해당 게시판에 접근할 수 없습니다.");
                    navigate("/");
                } else {
                    alert("게시글을 가져오지 못했습니다.");
                }
            }finally{
                setLoading(false);
            };
        };
        getPosts();
    }, [categoryName, match, page]);
    
  return (
    <div>
        <div css={s.body}>
            <div css={s.left}>
                <BoardCategory category = {categoryName ?? "MEAL"} />
            </div>
            <div css={s.right}>
                <div css={s.headwrap}>
                    <h1 css={s.head}>
                        {categoryName === 'MEAL' && '식단 '}
                        {categoryName === 'ROUTINE' && '루틴 '}
                        {categoryName === 'COMMUNITY' && '커뮤니티 '}
                        게시판
                    </h1>
                </div>
                <div css={s.rightTop}>
                    <div css={s.search}>
                        <input css={s.searchInput} type="text" placeholder="키워드를 입력해주세요."/>
                        <button css={s.searchBtn}>검색</button>
                    </div>
                    <button css={s.writeBtn} onClick={() => navigate('./write')}>글쓰기</button>
                </div>
                <div css={s.board}>
                    <div css={s.spanHead}>
                        <span css={s.postIdSpan}>게시글 Id</span>
                        <span css={s.postTitleSpan}>게시글 제목</span>
                        <span css={s.postWriterSpan}>작성자</span>
                        <span css={s.postDateSpan}>작성일</span>
                    </div>
                    <button onClick={() => navigate(`/personal-community-boards/${matchId}/${categoryName}/1`)}>게시글 테스트용</button>
                    {loading ? (
                        <div css={s.loading}>로딩 중...</div>
                    ) : posts.length === 0 ? (
                        <div>게시글이 없습니다.</div>
                    ) : (
                        posts.map((post) => (
                            <div 
                                key={post.boardId}
                                css={s.post}
                                onClick={() => navigate(`/personal-community-boards/${matchId}/${categoryName}/${post.boardId}`)}
                            >
                                <div css={s.spans}>
                                   <span css={s.postIdSpan}>{post.boardId}</span>
                                    <span css={s.postTitleSpan}>{post.title}</span>
                                    <span css={s.postWriterSpan}>{post.writerName}</span>
                                    <span css={s.postDateSpan}>{new Date(post.createdAt).toLocaleDateString()}</span>
                                </div>
                            </div>
                        ))
                    )}
                </div>
                <div css={s.boardBottom}>
                    <button css={s.pageTextBtn} onClick={() => setPage(p => Math.max(p - 1, 0))} disabled={page === 0}>
                        ◀
                    </button>
                    {pageNumbers.map((pageNumber) => (
                        <button
                            key={pageNumber}
                            onClick={() => setPage(pageNumber)}
                            css={s.pageNumBtn}
                        >
                            {pageNumber + 1}
                        </button>
                    ))}
                    <button css={s.pageTextBtn} onClick={() => setPage(p => Math.max(p - 1, 0))} disabled={page === 0}>
                        ▶
                    </button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Board