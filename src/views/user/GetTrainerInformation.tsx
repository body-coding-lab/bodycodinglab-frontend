/** @jsxImportSource @emotion/react */
import { useEffect, useState } from 'react'
import MyPageSidebar from '../sidebar/MyPageSidebar';
import * as s from './UserStyle';
import { useCookies } from 'react-cookie';
import { useLocation, useNavigate } from 'react-router-dom';
import { GetTrainerInfoResponseDto } from '@/dtos/user/response/get-trainer-info.response.dto';
import { getMenuTitleByPath } from '@/utils/Menu';
import { getTrainerInfoRequest } from '@/apis/user/get-trainer-info.api';
import { trainerStatusToKr } from '@/utils/TrainerStatusMap';

function GetTrainerInformation() {
  const navigate = useNavigate();
  const [cookies] = useCookies(['accessToken']);
  const location = useLocation();
  const [trainer, setTrainer] = useState<GetTrainerInfoResponseDto | null>(null);
  const path = location.pathname;
  const menuTitle = getMenuTitleByPath(path);
  const accessToken = cookies.accessToken;

  const handleEditClick = () => {
    navigate('/users/trainers/me/setting', {
      state: {
        trainer,
      }
    });
  }

  const fetchInformation = async () => {
    if (!accessToken) return;
  
    try {
      const response = await getTrainerInfoRequest(accessToken);
      const { code, message, data } = response;
  
      if (code === 'SU' && data) {
        setTrainer(data);
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
                <label css={s.formLabel}>트레이너 번호</label>
                <span css={s.formSpan}>{trainer?.trainerId}</span>
              </div>
              <div css={s.formInformation}>
                <label css={s.formLabel}>아이디</label>
                <span css={s.formSpan}>{trainer?.username}</span>
              </div>
              <div css={s.formInformation}>
                <label css={s.formLabel}>성명</label>
                <span css={s.formSpan}>{trainer?.name}</span>
              </div>
              <div css={s.formInformation}>
                <label css={s.formLabel}>생년월일</label>
                <span css={s.formSpan}>{trainer?.birthdate}</span>
              </div>
              <div css={s.formInformation}>
                <label css={s.formLabel}>성별</label>
                <span css={s.formSpan}>{trainer?.gender === 'MALE' ? '남' : '여' }</span>
              </div>
              <div css={s.formInformation}>
                <label css={s.formLabel}>휴대폰번호</label>
                <span css={s.formSpan}>{trainer?.phone}</span>
              </div>
              <div css={s.formInformation}>
                <label css={s.formLabel}>이메일</label>
                <span css={s.formSpan}>{trainer?.email}</span>
              </div>
              <div css={s.formInformation}>
                <label css={s.formLabel}>승인/거부</label>
                <span css={s.formSpan}>{trainer ? trainerStatusToKr[trainer.status] : ''}</span>
              </div>
            </div>
            <div css={s.formSectionInformation}>
              <h2 css={s.formInfomationTitle}>추가 정보</h2>
              <p css={s.formInfomationWarningTitle}>근무지 주소 변경은 관리자에게 문의해 주세요.</p>
              <div css={s.formInformation}>
                <label css={s.formLabel}>근무지 주소</label>
                <span css={s.formSpan}>{trainer?.jobAddress}</span>
              </div>
              <div css={s.formInformation}>
                <label css={s.formLabel}>첨부파일(계약서 등)</label>
                {trainer?.attachmentFileUrl ? (
                  <a
                    href={`http://localhost:8080${trainer.attachmentFileUrl}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    css={s.formSpan}
                  >
                    첨부파일 다운로드
                  </a>
                ) : (
                  <span css={s.formSpan}>첨부된 파일이 없습니다.</span>
                )}
              </div>
            </div>
            <button css={s.editBottomButton} onClick={handleEditClick}>수정하기</button>
        </div>
      </div>
    </>
  );
}

export default GetTrainerInformation;