/** @jsxImportSource @emotion/react */
import { useNavigate, useParams } from "react-router-dom";
import * as s from "./BoardStyle";
import React, { useEffect, useState } from 'react'
import BoardCategory from "./BoardCategory";

function Board() {
    const navigate = useNavigate();
    const [ loading, setLoading] = useState(true);
    // const [ matchId, setMatchId ] = useState<number | null>(null);
    const matchId = 1;// 테스트용
    // const [ posts, setPosts ] = useState<BoardPost[]>([]);
    const { categoryId } = useParams<{ categoryId: string}>();
    const numericCategoryId = Number(categoryId);
    const [ page, setPage ] = useState(0);
    const [ totalPages, setTotalPages ] = useState(1);
    // const pageNumbers = getPageNumbers(page, totalPages);

    
  return (
    <div>
        <div css={s.body}>
            <div css={s.left}>
                <BoardCategory categoryId={numericCategoryId} />
            </div>
            <div css={s.right}>
                <div css={s.headwrap}>
                    <h1 css={s.head}>
                        {categoryId === '1' && '식단 '}
                        {categoryId === '2' && '루틴 '}
                        {categoryId === '3' && '커뮤니티 '}
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
                    <button onClick={() => navigate(`/personal-community-boards/${matchId}/${categoryId}/1`)}>게시글 테스트용</button>
                    {/* {loading ? (
                        <div css={s.loading}>로딩 중...</div>
                    ) : posts.length === 0 ? (
                        <div>게시글이 없습니다.</div>
                    ) : (
                        posts.map((post) => (
                            <div 
                                key={post.id}
                                css={s.post}
                                onClick={() => navigate(`/personal-community-boards/${matchId}/${categoryId}/${post.id}`)}
                            >
                                <div css={s.spans}>
                                   <span css={s.postIdSpan}>{post.id}</span>
                                    <span css={s.postTitleSpan}>{post.title}</span>
                                    <span css={s.postWriterSpan}>{post.writerName}</span>
                                    <span css={s.postDateSpan}>{new Date(post.createdAt).toLocaleDateString()}</span>
                                </div>
                            </div>
                        ))
                    )} */}
                </div>
                {/* <div css={s.boardBottom}>
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
                </div> */}
            </div>
        </div>
    </div>
  )
}

export default Board