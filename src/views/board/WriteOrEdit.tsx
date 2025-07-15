/** @jsxImportSource @emotion/react */
import { useNavigate } from "react-router-dom";
import * as s from "./WriteorEditStyle";
import React, { useEffect, useState } from 'react'
import { jwtDecode } from "jwt-decode";

function WriteOrEdit({isEdit, data, categoryId, postId}: {isEdit: boolean, data?: GetPostData, categoryId: number, postId?: number}) {
  const navigate = useNavigate();
  const [title, setTitle] = useState(data?.title || '');
  const [content, setContent] = useState(data?.content || '');
  const [writerId, setWriterId] = useState<number | null>(null);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [matchId, setMatchId] = useState<number | null>(null);
  const [viewCount, setViewCount] = useState(0);
  const [existingImages, setExistingImages] = useState<string[]>(data?.imageUrls || []);
  const [deletedImageUrls, setDeletedImageUrls] = useState<string[]>([]);

  useEffect(() => {
    async function fetchMatchId(){
        const id = await getUserMatchId();
        setMatchId(id);
    }
    fetchMatchId();
  },[]);

  useEffect(() => {
    const token = getAccessTokenFromCookie();
    if(token){
        const decoded: any = jwtDecode(token);
        setWriterId(decoded.userId);
    }
  },[]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if(e.target.files && e.target.files.length > 0){
        setSelectedFiles(Array.from(e.target.files));
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!matchId || !writerId){
        alert('matchID 또는 작성자ID가 누락되었습니다.');
        return;
    }

    const category = {id: categoryId};
    const json = JSON.stringify({title, content, category, matchId, writerId, viewCount,
        deletedImageUrls: isEdit ? deletedImageUrls : undefined
    });
    const formData = new FormData();
    formData.append('data', new Blob([json], {type: 'application/json'}));
    selectedFiles.forEach((file) => {
        formData.append('files', file);
    });

    try{
        if(isEdit){
            if (!postId) throw new Error("postId가 필요합니다.");
            await editPost(matchId, categoryId, formData, postId, token)
        } else {
            await writePost(matchId, categoryId, formData, token)
        }
        alert (isEdit ? '수정 완료.' : '작성 완료.');
        navigate(`/personal-community-boards/${matchId}/${categoryId}`);
    } catch (error) {
        alert('오류가 발생했습니다.');
    }
  }

  const handleFileDelete = (index: number) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
  }

  const handleExistingImageDelete = (url: string) => {
    setExistingImages(prev => prev.filter(img => img !== url));
    setDeletedImageUrls(prev => [...prev, url]);
  }
    return (
    <form css={s.right} onSubmit={handleSubmit}>
        <div css={s.headWrap}>
            <h1 css={s.head}>{isEdit ? "수정" : "글쓰기"}</h1>
        </div>
        <div css={s.titleWrap}>
            <input css={s.title} value={title} onChange={(e) => setTitle(e.target.value)} placeholder="제목을 입력해주세요." />
        </div>
        <div css={s.contentWrap}>
            <textarea css={s.content} value={content} onChange={(e) => setContent(e.target.value)} placeholder="내용을 입력해주세요."></textarea>
        </div>
        <input css={s.file} type="file" accept="image/" multiple onChange={handleFileChange} />
        <div css={s.previewWrap}>
            {existingImages.map((url, index) => (
                <div key={`existing-${index}`} css={s.previewItem}>
                    <img 
                        src={url}
                        alt={`existing-${index}`}
                        css={s.previewImage} 
                    />
                    <button
                        type="button"
                        css={s.deleteBtn}
                        onClick={() => handleExistingImageDelete(url)}
                    >
                        삭제
                    </button>
                </div>
            ))}
            {selectedFiles.map((file, index) => (
                <div key={index} css={s.previewItem}>
                    <img 
                        src={URL.createObjectURL(file)} 
                        alt={`preview-${index}`}
                        css={s.previewImage}
                    />
                    <button
                        type="button"
                        css={s.deleteBtn}
                        onClick={() => handleFileDelete(index)}
                    >
                        삭제
                    </button>
                </div>
            ))}
        </div>
        <button css={s.writeBtn} type="submit">{isEdit ? "수정" : "글쓰기:"}</button>
    </form>
  )
}

export default WriteOrEdit