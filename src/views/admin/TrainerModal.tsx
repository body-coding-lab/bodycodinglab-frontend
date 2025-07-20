/** @jsxImportSource @emotion/react */
import React, { useState } from 'react'
import * as s from './AdminStyle';
import { useCookies } from 'react-cookie';
import { updateTrainerStatusRequest } from '@/apis/admin/update-trainer-status.api';
import { GetTrainerDetailResponseDto } from '@/dtos/admin/response/get-trainer-detail.response.dto';

interface Props {
  trainer: GetTrainerDetailResponseDto;
  onClose: () => void; 
  onStatusUpdated: () => void;
}

const TrainerModal = ({ trainer, onClose, onStatusUpdated }: Props) => {
  const [isRejecting, setIsRejecting] = useState(false);
  const [changeReason, setChangeReason] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [cookies] = useCookies(['accessToken']);

  const updateStatus = async (newStatus: 'APPROVED' | 'REJECTED', changeReason: string) => {
    const accessToken = cookies.accessToken;

    if (!accessToken) {
      alert('로그인이 필요합니다.');
      return;
    }

    const ok = window.confirm(
      newStatus === 'APPROVED'
        ? '승인하시겠습니까?'
        : '거부하시겠습니까?'
    );
    if (!ok) return;

    setIsLoading(true);

    try {
      const dto = { newStatus, changeReason };
      const { code, message } = await updateTrainerStatusRequest(
        trainer.trainerId,
        dto,
        accessToken
      );

      console.log(code + " : " + message);
  
      if (code !== 'SU') {
        alert(`상태 변경 실패: ${message}`);
        return;
      }
  
      alert(newStatus === 'APPROVED' ? '승인 처리 완료' : '거부 처리 완료');
      onClose();
      onStatusUpdated();
    } catch (e) {
      console.log('트레이너 상태 변경 오류: ', e);
      alert('서버 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleApprove = () => updateStatus('APPROVED', '승인');

  const handleRejectConfirm = () => {
    if (!changeReason.trim()) {
      alert('거부 사유를 입력해주세요.');
      return;
    }
    updateStatus('REJECTED', changeReason.trim());
  };

  return (
    <>
      {isLoading && (
        <div css={s.fullPageLoader}>
          로딩 중입니다...
        </div>
      )}
      <div css={s.modalBackdrop} onClick={onClose}>
        <div css={s.modalBox} onClick={(e) => e.stopPropagation()}>
          <div css={s.topSection}>
            <div>
              <div css={s.fieldBox}>
                <div css={s.fieldRow}><strong>트레이너 번호</strong></div>
                <p>{trainer.trainerId}</p>
                <div css={s.fieldRow}><strong>아이디</strong></div>
                <p>{trainer.username}</p>
                <div css={s.fieldRow}><strong>이름</strong></div>
                <p>{trainer.name}</p>
                <div css={s.fieldRow}><strong>생년월일</strong></div>
                <p>{trainer.birthdate}</p>
                <div css={s.fieldRow}><strong>성별</strong></div>
                <p>{trainer.gender}</p>
                <div css={s.fieldRow}><strong>휴대폰번호</strong></div>
                <p>{trainer.phone}</p>
                <div css={s.fieldRow}><strong>이메일</strong></div>
                <p>{trainer.email}</p>
              </div>
            </div>
            <div css={s.profileBox}>
              <img
                src={trainer?.profileImageUrl
                      ? `http://localhost:8080${trainer.profileImageUrl}?v=${Date.now()}`
                      : '/default-profile.png'
                    }
                alt='profile'
                onError={(e) => {
                  e.currentTarget.src = '/default-profile.png';
                }}
              />
            </div>
          </div>

          <div css={s.fieldBox}>
            <div css={s.fieldRow}><strong>근무지 주소</strong></div>
            <p>{trainer.jobAddress}</p>
          </div>

          <div css={s.fieldBox}>
            <div css={s.fieldRow}><strong>첨부파일</strong></div>
            {trainer.attachmentFileUrl ? (
              <a
                href={`http://localhost:8080${trainer.attachmentFileUrl}`}
                target='_blank'
                rel='noopener noreferrer'
                css={s.fileDownloadLink}
              >
                첨부파일 다운로드
              </a>
            ) : (
              <p>첨부된 파일이 없습니다.</p>
            )}
          </div>

          {isRejecting && (
            <div css={s.changeReasonBox}>
              <div css={s.fieldRow}><strong>거부 사유</strong></div>
              <textarea
                css={s.textarea}
                rows={4}
                placeholder='거부 사유를 입력해주세요'
                value={changeReason}
                onChange={(e) => setChangeReason(e.target.value)}
              />
              <div css={s.rejectButtonGroup}>
                <button css={s.rejectButton} onClick={handleRejectConfirm}>거부 확정</button>
                <button css={s.closeButton} onClick={() => setIsRejecting(false)}>취소</button>
              </div>
            </div>
          )}

          {!isRejecting && (
            <div css={s.buttonContainer}>
              <button css={s.closeButton} onClick={onClose}>닫기</button>

              {trainer.status === 'PENDING' && (
                <>
                  <button css={s.approveButton} onClick={handleApprove}>승인</button>
                  <button css={s.rejectButton} onClick={() => setIsRejecting(true)}>거부</button>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default TrainerModal;