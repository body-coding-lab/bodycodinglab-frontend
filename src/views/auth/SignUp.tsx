/** @jsxImportSource @emotion/react */
import React from 'react'
import { useNavigate } from 'react-router-dom';
import * as s from './AuthStyle';

function SignUp() {
  const navigate = useNavigate();

  const onMemberClick = () => navigate("/auth/sign-up/member");
  const onTrainerClick = () => navigate("/auth/sign-up/trainer");

  return (
    <>
      <div css={s.container}>
        <h2 css={s.title}>회원가입</h2>
        <div css={s.selectionWrapper}>
          <div css={s.selection} onClick={onMemberClick}>
            <div css={s.selectionImage}></div>
            <label css={s.selectionLabel}>일반 회원</label>
          </div>
          <div css={s.selection} onClick={onTrainerClick}>
            <div css={s.selectionImage}></div>
            <label css={s.selectionLabel}>트레이너</label>
          </div>
        </div>
      </div>
    </>
  )
}

export default SignUp;