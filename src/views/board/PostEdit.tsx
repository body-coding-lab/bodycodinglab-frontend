/** @jsxImportSource @emotion/react */
import { useParams } from "react-router-dom";
import * as s from "./WriteorEditStyle";
import React, { useEffect, useState } from 'react'
import BoardCategory from "./BoardCategory";
import { useCookies } from "react-cookie";
import { getPost } from "@/apis/board/board.api";
import WriteOrEdit from "./WriteOrEdit";
function PostEdit() {
    const {categoryName, postId} = useParams<{categoryName: string; postId: string}>();
    const parsedPostId = postId ? parseInt(postId, 10) : undefined;
    const [formData, setFormData] = useState(true);
    const [loading, setLoading] = useState(true);
    const {matchId} = useParams<{matchId: string}>();
    const match = Number(matchId);
    const [cookies, setCookies] = useCookies(["accessToken"]);
    
    useEffect(() => {
        if(!categoryName || !postId || matchId === null){
            setLoading(true);
            return;
        }

        const fetchPost = async() =>{
            try {
                const token = cookies.accessToken;
                if(!token) throw new Error("로그인 토큰이 없습니다.");

                const post = await getPost(match, Number(postId), token);

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
    }, [categoryName, postId, matchId]);
    if(loading) return <div>불러오는 중...</div>;
    if(!formData) return <div>존재하지 않는 게시글입니다.</div>;
  return (
    <div>
        <div css={s.body}>
            <div css={s.left}>
                <BoardCategory category = {categoryName ?? "MEAL"} />
            </div>
            <WriteOrEdit isEdit={true} data={formData} categoryName={categoryName} postId={parsedPostId}} />
        </div>
    </div>
  )
}

export default PostEdit