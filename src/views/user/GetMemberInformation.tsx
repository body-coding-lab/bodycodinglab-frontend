/** @jsxImportSource @emotion/react */
import { useEffect, useState } from 'react'
import MyPageSidebar from '../sidebar/MyPageSidebar';
import * as s from './UserStyle';
import { useCookies } from 'react-cookie';
import { useLocation, useNavigate } from 'react-router-dom';
import { GetMemberInfoResponseDto } from '@/dtos/user/response/get-member-info.response.dto';
import { getMenuTitleByPath } from '@/utils/Menu';
import { getMemberInfoRequest } from '@/apis/user/get-member-info.api';

function GetMemberInformation() {
  const navigate = useNavigate();
  const [cookies] = useCookies(['accessToken']);
  const location = useLocation();
  const [member, setMember] = useState<GetMemberInfoResponseDto | null>(null);
  const path = location.pathname;
  const menuTitle = getMenuTitleByPath(path);
  const accessToken = cookies.accessToken;

  const handleEditClick = () => {
    navigate('/users/members/me/setting', {
      state: {
        member,
      }
    });
  }

  const fetchInformation = async () => {
    if (!accessToken) return;
  
    try {
      const response = await getMemberInfoRequest(accessToken);
      const { code, message, data } = response;
  
      if (code === 'SU' && data) {
        setMember(data);
        return;
      } else {
        alert('개인 정보 불러오기 실패');
      }    
    } catch (e) {
      alert('서버 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.');
    }
  }

  useEffect(() => {
    fetchInformation();
  }, []);

  return (
    <>
      <div css={s.layout}>
        <MyPageSidebar />
        <div css={s.main}>
          <h2 css={s.mainTitle}>{menuTitle}</h2>
            <div css={s.formSectionInformation}>
              <button css={s.editButton} onClick={handleEditClick}>수정하기</button>
              <h2 css={s.formInfomationTitle}>기본 정보</h2>
              <div css={s.formInformation}>
                <label css={s.formLabel}>아이디</label>
                <span css={s.formSpan}>{member?.username}</span>
              </div>
              <div css={s.formInformation}>
                <label css={s.formLabel}>성명</label>
                <span css={s.formSpan}>{member?.name}</span>
              </div>
              <div css={s.formInformation}>
                <label css={s.formLabel}>생년월일</label>
                <span css={s.formSpan}>{member?.birthdate}</span>
              </div>
              <div css={s.formInformation}>
                <label css={s.formLabel}>성별</label>
                <span css={s.formSpan}>{member?.gender === 'MALE' ? '남' : '여' }</span>
              </div>
              <div css={s.formInformation}>
                <label css={s.formLabel}>휴대폰번호</label>
                <span css={s.formSpan}>{member?.phone}</span>
              </div>
              <div css={s.formInformation}>
                <label css={s.formLabel}>이메일</label>
                <span css={s.formSpan}>{member?.email}</span>
              </div>
            </div>
            <div css={s.formSectionInformation}>
              <h2 css={s.formInfomationTitle}>추가 정보</h2>
              <div css={s.formInformation}>
                <label css={s.formLabel}>주소</label>
                <span css={s.formSpan}>{member?.memberAddress}</span>
              </div>
            </div>
        </div>
      </div>
    </>
  );
}

export default GetMemberInformation;