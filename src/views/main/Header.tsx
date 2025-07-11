/** @jsxImportSource @emotion/react */
import React from 'react'
import * as s from "./HeaderStyle";
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/stores/auth.store';
import { useUserStore } from '@/stores/user.store';
import { useCookies } from 'react-cookie';

function Header() {
    const navigate = useNavigate();
    const isLogin = useAuthStore((state) => state.isLogin);
    const user = useUserStore((state) => state.user);

    const handleProfileClick = () => {
        if(user?.role === 'MEMBER') navigate('/users/members/me');
        if(user?.role === 'TRAINER') navigate('/users/trainers/me');
        if(user?.role === 'ADMIN') navigate('/admin/trainers');
    }

    const [ _, __, removeCookie] = useCookies(["accessToken"]);
    const setLogout = useAuthStore((state) => state.setLogout);
    const setUser = useUserStore((state) => state.setUser);

    const handleLogout = () => {
        removeCookie("accessToken", {path: '/'});
        setLogout();
        setUser(null);
        alert('로그아웃 되었습니다.');
        navigate('/');
    }

    const setLogin = useAuthStore((state) => state.setLogin);//테스트용 로그인버튼
  return (
    <div>
        <header css={s.headerStyle}>
            <div css={s.header}>
                <div css={s.logoStyle} onClick={() => navigate("/")}></div>
                <nav css={s.headerNav}>
                    <div css={s.headerNavDivs} onClick={() => navigate('/fitmateintro')}>핏메이트 소개</div>
                    <div css={s.headerNavDivs} onClick={() => navigate('/trainers/search')}>트레이너 찾기</div>
                    {isLogin && user?.role === 'TRAINER' && user.trainerStatus === 'REJECT' ? (<div css={s.headerNavDivs}>트레이너 재신청</div>) : <></>}
                    {isLogin && user?.trainerStatus !== 'REJECT' ? (<div css={s.headerNavDivs} onClick={() => navigate('/personal-community-boards')}>1대1 커뮤니티</div>) : <></>}
                </nav>
                <div>
                    {isLogin ? (
                        <div css={s.loginStyle}>
                            <img src="/default-profile.png" alt="profile" css={s.loginProfile} onClick={handleProfileClick} />
                            <span onClick={handleProfileClick}>{user?.name}님</span>
                            <button css={s.loginNoteBtn} onClick={() => navigate('/notes')}>쪽지</button>
                            <button css={s.logoutBtn} onClick={handleLogout}>로그아웃</button>
                        </div>
                    ) : (
                        <div css={s.loginDefault}>
                            <Link to="/auth/login" css={s.linkStyle}>로그인</Link>
                            <span css={s.dividerLink}>/</span>
                            <Link to="/auth/sign-up" css={s.linkStyle}>회원가입</Link>
                            <button onClick={() => setLogin("test-token")}>로그인(테스트)</button>
                        </div>
                        )
                    }
                </div>
            </div>
        </header>
    </div>
  )
}

export default Header