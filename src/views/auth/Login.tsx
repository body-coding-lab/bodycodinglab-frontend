/** @jsxImportSource @emotion/react */
import React, { FormEvent, useState } from 'react'
import * as s from "./AuthStyle";
import { Link, useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { useAuthStore } from '@/stores/auth.store';
import { useUserStore } from '@/stores/user.store';
import { validateLoginForm } from '@/utils/validaeLoginForm';
import { LoginUserRequestDto } from '@/dtos/auth/request/login.request.dto';
import { loginRequest } from '@/apis/auth/login.api';

function Login() {
  const navigate = useNavigate();
  const [cookies, setCookies] = useCookies(["accessToken"]);
  const setLogin = useAuthStore((state) => state.setLogin);
  const setUser = useUserStore((state) => state.setUser);

  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setForm(prev => ({ ...form, [name]: value }));
  };

  const handleLogin = async(e: FormEvent) => {
    e.preventDefault();

    const { username: formUsername, password } = form;

    const validMessage = validateLoginForm(form);
    if (validMessage) {
      alert(validMessage);
      return;
    }

    try {
      const dto: LoginUserRequestDto = { username: formUsername, password };
      const response = await loginRequest(dto);
      const { code, message, data } = response;
  
      if (code !== 'SU' || !data) {
        alert(message);
        return;
      }
  
      const { token, exprTime, id, role, username, name, profileImageUrl } = data;
  
      if (!exprTime || isNaN(exprTime)) {
        return;
      }
  
      const expireDate = new Date();
      expireDate.setMilliseconds(expireDate.getMilliseconds() + exprTime);
  
      setCookies("accessToken", token, {
        path: '/',
        expires: expireDate,
        sameSite: 'strict',
        secure: true,
      });
  
      setLogin(token);
      
      if (role === 'TRAINER' && 'trainerStatus' in data && data.trainerStatus === 'REJECTED') {
        const trainerStatus = data.trainerStatus;

        setUser({
          userId: id,
          role,
          username,
          name,
          profileImageUrl,
          trainerStatus,
        });

        navigate('/users/trainers/me/reapply');
      } else {
        setUser({
          userId: id,
          role,
          username,
          name,
          profileImageUrl,
        });
  
        navigate('/');
      }

    } catch (e) {
      alert('서버 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.');
    }
  };

  return (
    <>
      <div css={s.container}>
        <form onSubmit={handleLogin} css={s.formWrapper}>
          <div css={s.formSection}>
            <h2 css={s.formTitle}>로그인</h2>
            <div css={s.form}>
              <div css={s.inputLoginWrapper}>
                <input
                  type='text'
                  name='username'
                  value={form.username}
                  placeholder='아이디'
                  onChange={handleInputChange}
                  css={s.input}
                />
              </div>
            </div>
            <div css={s.form}>
              <div css={s.inputLoginWrapper}>
                <input
                  type='password'
                  name='password'
                  value={form.password}
                  placeholder='비밀번호'
                  onChange={handleInputChange}
                  css={s.input}
                />
              </div>
            </div>
            <button
              type='submit'
              css={s.buttonLogin}>
              로그인
            </button>
            <div css={s.linkEtcFunction}>
              <Link to="/username/recovery" css={s.link}>아이디 찾기</Link>
              <span css={s.divider}>|</span>
              <Link to="/password/reset-user" css={s.link}>비밀번호 재설정</Link>
              <span css={s.divider}>|</span>
              <Link to="/auth/sign-up" css={s.link}>회원가입</Link>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default Login;