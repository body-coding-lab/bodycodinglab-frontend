/** @jsxImportSource @emotion/react */
import { useParams } from "react-router-dom";
import * as s from "./WriteorEditStyle";
import React, { useEffect, useState } from 'react'
import BoardCategory from "./BoardCategory";
function PostEdit() {
    const {categoryId, postId} = useParams<{categoryId: string; postId: string}>();
    const parsedCategoryId = parseInt(categoryId || '1', 10);
    const parsedPostId = postId ? parseInt(postId, 10) : undefined;
    const [formData, setFormData] = useState(true);
    const [loading, setLoading] = useState(true);
    const [matchId, setMatchId] = useState<number | null>(null);

    useEffect(() => {
        async function fetchMatchId() {
            const id = await getUserMatchId();
            setMatchId(id);
        }
        fetchMatchId();
    }, []);
    useEffect(() => {
        if(!categoryId || !postId || matchId === null){
            setLoading(true);
            return;
        }

        const fetchPost = async() =>{
            try {
                const token = getAccessTokenFromCookie();
                if(!token) throw new Error("로그인 토큰이 없습니다.");

                const post = await fetchPostDetail(matchId, Number(categoryId), Number(postId), token);

                setFormData({
                    postId: parsedPostId!,
                    title: post.title,
                    content: post.content,
                });
            } catch(err) {
                alert('게시글을 불러오지 못했습니다.');
            } finally {
                setLoading(false);
            }
        };
        fetchPost();
    }, [categoryId, postId, matchId]);
    if(loading) return <div>불러오는 중...</div>;
    if(!formData) return <div>존재하지 않는 게시글입니다.</div>;
  return (
    <div>
        <div css={s.body}>
            <div css={s.left}>
                <BoardCategory categoryId={parsedCategoryId} />
            </div>
            <writeOrEdit isEdit={true} data={formData} categoryId={parsedCategoryId postId={parsedPostId}} />
        </div>
    </div>
  )
}

export default PostEdit