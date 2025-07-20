/** @jsxImportSource @emotion/react */
import React, { FormEvent, useState } from 'react'
import * as s from './AuthStyle';
import { Link } from 'react-router-dom';
import { RecoverUsernameRequestDto } from '@/dtos/auth/request/recover-username.request.dto';
import { recoverUsernameRequest } from '@/apis/auth/recover-username.api';
import { validateFindUsernameForm } from '@/utils/FindUsername';

function RecoverUsername() {
  const [isFinding, setIsFinding] = useState(false);
  const [foundUsername, setFoundUsername] = useState('');
  const [form, setForm] = useState({
    name: "",
    birthdate: "",
    email: ""
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async(e: FormEvent) => {
    e.preventDefault();

    const { name, birthdate, email } = form;
    const validMessage = validateFindUsernameForm(form);
    if (validMessage) {
      alert(validMessage);
      return;
    }

    try {
      const dto: RecoverUsernameRequestDto = { name, birthdate, email };
      const response = await recoverUsernameRequest(dto);
      const { code, message, data } = response;

      if (code !== 'SU' || !data) {
        alert(message);
        return;
      }

      const { username } = data;
      setFoundUsername(username);
      setIsFinding(true);
    } catch (e) {
    console.log('아이디 찾기 오류: ', e);
    alert('서버 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.');
    }
  };

  return (
    <>
      {!isFinding && (
        <div css={s.container}>
          <form onSubmit={handleSubmit} css={s.formWrapper}>
            <div css={s.formSection}>
              <h2 css={s.formTitle}>아이디 찾기</h2>
              <div css={s.form}>
                <label css={s.labelFindUsername}>성명</label>
                <div css={s.inputFindUsernameWrapper}>
                <input
                  type='text'
                  name='name'
                  value={form.name}
                  onChange={handleInputChange}
                  css={s.input}
                />
                </div>
              </div>
              <div css={s.form}>
                <label css={s.labelFindUsername}>생년월일</label>
                <div css={s.inputFindUsernameWrapper}>
                <input
                  type='date'
                  name='birthdate'
                  value={form.birthdate}
                  onChange={handleInputChange}
                  css={s.input}
                />
                </div>
              </div>
              <div css={s.form}>
                <label css={s.labelFindUsername}>이메일</label>
                <div css={s.inputFindUsernameWrapper}>
                <input
                  type='email'
                  name='email'
                  value={form.email}
                  placeholder='example@example.com'
                  onChange={handleInputChange}
                  css={s.input}
                />
                </div>
              </div>
              <button
                type='submit'
                css={s.buttonFindUsername}>
                아이디 찾기
              </button>
            </div>
          </form>
        </div>
      )}

      {isFinding && (
        <div css={s.container}>
          <div css={s.getSection}>
            <label css={s.labelFindUsername}>회원님의 아이디는</label>
            <span css={s.getFindedUsername}>{foundUsername}</span>
            <span css={s.labelFindUsername}>입니다.</span>
            <div css={s.linkLoginOrResetPassword}>
                <div css={s.linkGroup}>
                  <span>로그인을 시도하시겠습니까?</span>
                  <Link to="/auth/login" css={s.link}>로그인</Link>
                </div>
                <div css={s.linkGroup}>
                  <span>비밀번호를 재설정하시겠습니까?</span>
                  <Link to="/password/reset-user" css={s.link}>비밀번호 재설정</Link>
                </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default RecoverUsername;