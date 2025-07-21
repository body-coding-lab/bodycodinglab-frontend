/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from 'react'
import * as s from './AdminStyle';
import { useLocation, useNavigate } from 'react-router-dom';
import { GetAllTrainersResponseDto } from '@/dtos/admin/response/get-all-trainers.response.dto';
import { getAllTrainersRequest } from '@/apis/admin/get-all-trainers.api';
import { useCookies } from 'react-cookie';
import { getTrainerDetailRequest } from '@/apis/admin/get-trainer-detail.api';
import { GetTrainerDetailResponseDto } from '@/dtos/admin/response/get-trainer-detail.response.dto';
import { getMenuTitleByPath } from '@/utils/Menu';
import MyPageSidebar from '../sidebar/MyPageSidebar';
import TrainerModal from './TrainerModal';
import { trainerStatusToEn, trainerStatusToKr } from '@/utils/TrainerStatusMap';

function TrainerList() {
  const navigate = useNavigate();
  const location = useLocation();
  const [trainers, setTrainers] = useState<GetAllTrainersResponseDto[]>([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [selectedTrainer, setSelectedTrainer] = useState<GetTrainerDetailResponseDto | null>(null);
  const [selectedStatus, setSelectedStatus] = useState('전체');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [cookies] = useCookies(['accessToken']);
  const path = location.pathname;
  const menuTitle = getMenuTitleByPath(path);
  const maxPageButtons = 5;
  const startPage = Math.floor(page / maxPageButtons) * maxPageButtons;
  const endPage = Math.min(startPage + maxPageButtons, totalPages);

  useEffect(() => {
    fetchTrainers();
  }, [page, selectedStatus]);

  const fetchTrainers = async () => {
    const accessToken = cookies.accessToken;

    if (!accessToken) return;

    try {
      const response = await getAllTrainersRequest(page, 10, trainerStatusToEn[selectedStatus], accessToken);
      const { code, message, data } = response;

      if (code === 'SU' && data) {
        setTrainers(data.content);
        setTotalPages(data.totalPages);
      } else {
        setTrainers([]);
        alert('트레이너 목록 불러오기 실패');
      }
    } catch (e) {
      alert('트레이너 목록 요청 중 문제가 발생했습니다.');
    }
  };

  const handlerFilterChange = (label: string) => {
    setSelectedStatus(label);
    setPage(0);
  }

  const handleDetailClick = async (trainerId: number) => {
    const accessToken = cookies.accessToken;

    if (!accessToken) {
      alert('로그인이 필요합니다.');
      navigate('/auth/login');
      return;
    }

    try {
      const response = await getTrainerDetailRequest(trainerId, accessToken);
      const { code, message, data } = response;

      if (code !== 'SU' || !data) {
        alert(message);
        return;
      }

      setSelectedTrainer(data);
      setIsModalOpen(true);
    } catch (error) {
      alert('상세 조회 실패');
    }
  };
  
  return (
    <>
      <div css={s.layout}>
        <MyPageSidebar />
        <div css={s.main}>
          <h2 css={s.mainTitle}>{menuTitle}</h2>
          <div css={s.filterButtonContainer}>
            <div css={s.filterButtonsLeft}>
              {['전체', '대기', '승인', '거부'].map((label) => (
                <button
                  key={label}
                  css={s.filterButton(selectedStatus === label)}
                  onClick={() => handlerFilterChange(label)}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
          <table css={s.table}>
            <thead css={s.thead}>
              <tr>
                <th>순번</th>
                <th>아이디</th>
                <th>성명</th>
                <th>생년월일</th>
                <th>근무지</th>
                <th>가입일</th>
                <th>상태</th>
                <th>상세 조회</th>
              </tr>
            </thead>
            <tbody css={s.tbody}>
              {Array.isArray(trainers) && trainers.map((trainer, index) => (
                <tr key={trainer.trainerId}>
                  <td>{page * 10 + index + 1}</td>
                  <td>{trainer.username}</td>
                  <td>{trainer.name}</td>
                  <td>{trainer.birthdate}</td>
                  <td>{trainer.jobAddress}</td>
                  <td>{trainer.createdAt}</td>
                  <td>{trainerStatusToKr[trainer.status]}</td>
                  <td>
                    <button 
                      className="detail"
                      onClick={() => handleDetailClick(trainer.trainerId)}
                    >
                      조회
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {totalPages > 0 && (
            <div css={s.paginationWrapper}>
              {startPage > 0 && (
                <button onClick={() => setPage(startPage - 1)} css={s.paginationButton(false)}>
                  &lt;
                </button>
              )}

              {Array.from({ length: endPage - startPage }, (_, i) => {
                const pageIndex = startPage + i;
                return (
                  <button
                    key={pageIndex}
                    css={s.paginationButton(page === pageIndex)}
                    onClick={() => setPage(pageIndex)}
                    disabled={page === pageIndex}
                  >
                    {pageIndex + 1}
                  </button>
                );
              })}

              {endPage < totalPages && (
                <button onClick={() => setPage(endPage)} css={s.paginationButton(false)}>
                  &gt;
                </button>
              )}
            </div>
          )}

          {isModalOpen && selectedTrainer && (
            <TrainerModal
              trainer={selectedTrainer}
              onClose={() => setIsModalOpen(false)}
              onStatusUpdated={() => {
                setIsModalOpen(false);
                setSelectedTrainer(null);
                setPage(0);
                fetchTrainers();
              }}
            />
          )}
        </div>
      </div>
    </>
  );
}

export default TrainerList;