/** @jsxImportSource @emotion/react */
import React, { FormEvent, useState } from 'react'
import * as s from './UserStyle';
import MyPageSidebar from '../sidebar/MyPageSidebar';
import { useCookies } from 'react-cookie';
import { useLocation, useNavigate } from 'react-router-dom';
import { UpdateTrainerInfoRequestDto } from '@/dtos/user/request/update-trainer-info.request.dto';
import { useUserStore } from '@/stores/user.store';
import { getMenuTitleByPath } from '@/utils/Menu';
import { validateUpdateTrainerInfoForm } from '@/utils/UpdateUserInformation';
import { updateTrainerInfoRequest } from '@/apis/user/update-trainer-info.api';

function UpdateTrainerInformation() {
  const navigate = useNavigate();
  const [cookies] = useCookies(['accessToken']);
  const location = useLocation();
  const [form, setForm] = useState({
    name: ""
  });
  const path = location.pathname;
  const trainer = location.state?.trainer;
  const menuTitle = getMenuTitleByPath(path);
  const accessToken = cookies.accessToken;
  const setName = useUserStore((state) => state.setName);
  
  if (!trainer) return <div>잘못된 접근입니다</div>;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleEditClick = async(e: FormEvent) => {
    e.preventDefault();

    const validMessage = validateUpdateTrainerInfoForm(form);

    if (validMessage) {
      alert(validMessage);
      return;
    }

    if (form.name.trim() === '') {
      alert('변경할 항목이 없습니다.');
      return;
    }

    const dto: UpdateTrainerInfoRequestDto = { name: form.name };

    try {
      const response = await updateTrainerInfoRequest(dto, accessToken);
      const { code, message } = response;

      if (code !== 'SU') {
        alert(message);
        return;
      }

      if (form.name.trim() !== '') {
        setName(form.name);
      }

      alert('회원 정보 수정이 완료되었습니다.');
      navigate('/users/trainers/me');
    } catch(e) {
      console.log('회원 정보 수정 오류: ', e);
      alert('서버 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.');
    }

  }

  return (
    <>
      <div css={s.layout}>
        <MyPageSidebar />
        <div css={s.main}>
          <h2 css={s.mainTitle}>{menuTitle}</h2>
            <div css={s.formSectionInformation}>
              <button css={s.editButton} onClick={handleEditClick}>수정 완료</button>
              <h2 css={s.formInfomationTitle}>기본 정보</h2>
              <div css={s.formInformation}>
                <label css={s.formLabel}>아이디</label>
                <span css={s.formSpan}>{trainer.username}</span>
              </div>
              <div css={s.formInformation}>
                <label css={s.formLabel}>성명</label>
                <div css={s.inputUpdateWrapper}>
                  <input
                    type="text"
                    name='name'
                    value={form.name}
                    onChange={handleInputChange}
                    css={s.input}
                  />
                </div>
              </div>
              <div css={s.formInformation}>
                <label css={s.formLabel}>생년월일</label>
                <span css={s.formSpan}>{trainer.birthdate}</span>
              </div>
              <div css={s.formInformation}>
                <label css={s.formLabel}>성별</label>
                <span css={s.formSpan}>{trainer?.gender === 'MALE' ? '남' : '여' }</span>
              </div>
              <div css={s.formInformation}>
                <label css={s.formLabel}>휴대폰번호</label>
                <span css={s.formSpan}>{trainer.phone}</span>
              </div>
              <div css={s.formInformation}>
                <label css={s.formLabel}>이메일</label>
                <span css={s.formSpan}>{trainer.email}</span>
              </div>
            </div>
            <button css={s.editBottomButton} onClick={handleEditClick}>수정 완료</button>
        </div>
      </div>
    </>
  );
}

export default UpdateTrainerInformation;