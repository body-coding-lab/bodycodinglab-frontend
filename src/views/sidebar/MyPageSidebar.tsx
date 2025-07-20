/** @jsxImportSource @emotion/react */
import { useUserStore } from '@/stores/user.store';
import { useMemo } from 'react'
import * as s from './SidebarStyle';
import { Link, useLocation } from 'react-router-dom';
import { getMenuTitleByPath } from '@/utils/Menu';
import LogoutButton from '@/components/LogoutButton';

type UserRole = "ADMIN" | "MEMBER" | "TRAINER";

// 마이페이지 메뉴 추가하면, /src/util/menu.util.ts 에도 추가 (경로와 라벨 맞춰야 함)
const menuMap = {
  ADMIN: [
    { label: "트레이너 관리", path: "/admin/trainers" },
  ],
  MEMBER: [
    { label: "개인 정보 조회 / 수정", path: "/users/members/me" },
    { label: "체험권", path: "/users/members/me/one-day-tickets" },
    { label: "쿠폰", path: "/users/members/me/coupons"},
    { label: "폼 작성 / 조회", path: "/users/members/me/forms"},
    { label: "매칭 조회", path: "/users/members/me/match-lists"},
    { label: "구독 관리", path: "/users/members/me/subscriptions"},
    { label: "회원 탈퇴", path: "/users/account-cancellation/me" },
  ],
  TRAINER: [
    { label: "개인 정보 조회 / 수정", path: "/users/trainers/me" },
    { label: "트레이너 정보 입력", path: "/users/trainers/me/information" },
    { label: "매칭 대기 관리", path: "/users/trainers/me/match-waiting-lists"},
    { label: "매칭 관리", path: "/users/trainers/me/match-success-lists"},
    { label: "체험권 관리", path: "/users/trainers/me/one-day-tickets" }, 
    { label: "쿠폰", path: "/users/trainers/me/coupons"},
    { label: "회원 탈퇴", path: "/users/account-cancellation/me" },
  ],
};

function MyPageSidebar() {
  const location = useLocation();
  const user = useUserStore((state) => state.user);
  const userRole = user?.role as UserRole | undefined;
  const menus = menuMap[userRole || "MEMBER"];

  const currentMenuLabel = useMemo(() => {
    return getMenuTitleByPath(location.pathname);
  }, [location.pathname]);

  const profileImageUrl = useMemo(() => {  
    return user?.profileImageUrl
      ? `http://localhost:8080${user.profileImageUrl}?v=${Date.now()}`
      : '/default-profile.png';
  }, [user?.profileImageUrl]);
  
  const handleUpdateClick = async () => {
    const popup = window.open(
      '/users/me/profile-image',
      '프로필 이미지 변경',
      'width=500, height=300, top=250, left=250, scrollbars=no, resizable=no'
    );

    if (popup === null) {
      alert('팝업 차단을 해제해주세요!');
    }
  }

  return (
    <aside css={s.sidebar}>
      <div css={s.profile}>
        <div css={s.profileWrapper}>
          <img
            src={profileImageUrl}
            alt='profile'
            onError={(e) => {
              e.currentTarget.src = '/default-profile.png';
            }}
            css={s.loginProfile}
          />
          <div onClick={handleUpdateClick} css={s.hoverText}>변경</div>
        </div>
        <p>{user?.name}</p>
        <LogoutButton />
      </div>
      <div css={s.menu}>
        <ul css={s.menuList}>
          {menus.map((menu) => (
            <li
              key={`${menu.label}-${menu.path}`}
            >
              <Link
                to={menu.path}
                css={s.link(currentMenuLabel === menu.label)}
              >
                {menu.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}

export default MyPageSidebar;