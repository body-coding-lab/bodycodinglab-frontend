/** @jsxImportSource @emotion/react */
import React, { FormEvent, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { useUserStore } from '@/stores/user.store';
import { DeleteUserRequestDto } from '@/dtos/user/request/delete-user.request.dto';
import { useCookies } from 'react-cookie';
import MyPageSidebar from '../sidebar/MyPageSidebar';
import * as s from './UserStyle';
import { useAuthStore } from '@/stores/auth.store';
import { getMenuTitleByPath } from '@/utils/Menu';
import { deleteUserRequest } from '@/apis/user/delete-user.api';

function DeleteUser() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
      password: "",
      deleteMessage: "",
  });
  const [_, __, removeCookie] = useCookies(["accessToken"]);
  const [cookies] = useCookies(['accessToken']);
  const location = useLocation();
  const path = location.pathname;
  const menuTitle = getMenuTitleByPath(path);
  const accessToken = cookies.accessToken;
  const setLogout = useAuthStore((state) => state.setLogout);
  const user = useUserStore((state) => state.user);

  if (!accessToken) return;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setForm({ ...form, [name]: value });
    };
  
  const handleDelete = async(e: FormEvent) => {
    e.preventDefault();

    const { password, deleteMessage } = form;

    if (!password) {
    alert('비밀번호를 입력해주세요.');
    return;
    }

    if (!deleteMessage || deleteMessage !== '탈퇴하겠습니다.') {
      alert('문구를 다시 확인해 주세요.');
      return;
    }

    try {
      const dto: DeleteUserRequestDto = { password, deleteMessage };
      const response = await deleteUserRequest(dto, accessToken);
      const { code, message, data } = response;

      if (code !== 'SU' || !data) {
        alert(message);
        return;
      }

      const { name } = data;

      alert(`${name}님의 회원 탈퇴가 완료되었습니다. 이용해 주셔서 감사합니다.`);
      removeCookie("accessToken", { path: '/' });
      setLogout();
      navigate('/');
    } catch (e) {
      alert('서버 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.');
    }
  };

  return (
    <>
      <div css={s.layout}>
        <MyPageSidebar />
        <div css={s.main}>
          <h2 css={s.mainTitle}>{menuTitle}</h2>
          <form css={s.formWrapper}>
            <div css={s.formSection}>
              <h2 css={s.formTitle}>회원 탈퇴</h2>
              <div css={s.form}>
                <label css={s.formLabelDeleteUser}>아이디</label>
                <div css={s.inputDeleteUsernameWrapper}>
                  <label css={s.formSpan}>{user?.username}</label>
                </div>
              </div>
              <div css={s.form}>
                <label css={s.formLabelDeleteUser}>비밀번호</label>
                <div css={s.inputDeleteUserWrapper}>
                  <input
                    type="password"
                    name="password"
                    value={form.password}
                    onChange={handleInputChange}
                    css={s.input}
                  />
                </div>
              </div>
              <div css={s.formDeleteUser}>
                <p>
                  아래 입력란에 <strong>“탈퇴하겠습니다.”</strong> 입력하시고, 확인 버튼을 눌러주세요.
                </p>
                <div css={s.inputDeleteUserWrapper}>
                  <input
                    type="text"
                    name="deleteMessage"
                    value={form.deleteMessage}
                    onChange={handleInputChange}
                    css={s.input}
                  />
                </div>
              </div>
              <button
                type="submit"
                onClick={handleDelete}
                css={s.buttonDeleteUser}
              >
                탈퇴
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default DeleteUser;