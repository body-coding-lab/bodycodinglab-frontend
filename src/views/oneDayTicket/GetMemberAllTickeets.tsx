/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from 'react'
import MyPageSidebar from '../sidebar/MyPageSidebar';
import { useLocation } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { GetMemberAllTicketsResponseDto } from '@/dtos/oneDayTicket/response/get-member-all-tickets.response.dto';
import { getMemberAllTicketsRequest } from '@/apis/oneDayTicket/get-member-all-tickets.api';
import * as s from './OneDayTicketStyle';
import { getMenuTitleByPath } from '@/utils/Menu';
import { oneDayTicketStatusMap } from '@/utils/OneDayTicketStatusMap';

function GetMemberAllTickets() {
  const [cookies] = useCookies(['accessToken']);
  const [tickets, setTickets] = useState<GetMemberAllTicketsResponseDto[]>([]);
  const [count, setCount] = useState<number>(3);
  const location = useLocation();
  const path = location.pathname;
  const menuTitle = getMenuTitleByPath(path);
  const issuedTickets = tickets.filter(ticket => ticket.status === 'ISSUED');
  const usedTickets = tickets.filter(ticket => ticket.status === 'USED');
  const canceledTickets = tickets.filter(ticket => ticket.status === 'CANCELED');
  
  useEffect(() => {
      fetchTickets();
  }, []);

  const fetchTickets = async () => {
    const accessToken = cookies.accessToken;

    if (!accessToken) return;

    try {
      const response = await getMemberAllTicketsRequest(accessToken);
      const { code, message, data } = response;

      if (code === 'SU' && data) {
        setTickets(data.tickets);
        setCount(data.count);
      } else {
        alert('체험권 목록 불러오기 실패');
      }
    } catch (e) {
      alert('체험권 목록 요청 중 문제가 발생했습니다.');
    }
  };

  return (
    <>
      <div css={s.layout}>
        <MyPageSidebar />
        <div css={s.main}>
          <h2 css={s.mainTitle}>{menuTitle}</h2>
          <div css={s.filterButtonContainer}>
            <div css={s.ticketCountText}>
              남은 체험권: {count}회
            </div>
          </div>
          <section css={s.ticketCardContainer}>
            {issuedTickets.length === 0 &&
              usedTickets.length === 0 &&
              canceledTickets.length === 0 && (
                <p css={s.emptyTicketMessage}>
                  발급된 체험권이 없습니다.
                </p>
            )}
            {issuedTickets.length > 0 && (
              <>
                <h3>발급 티켓</h3>
                {issuedTickets.map((ticket) => (
                  <article key={ticket.id} css={[s.ticketCard, s.getCardByStatus(ticket.status)]}>
                    <div css={s.ticketHeader}>
                      <div css={s.ticketMeta}>
                        <p>
                          체험권 번호: <span>{ticket.id}</span>
                        </p>
                        <p css={s.statusBadge}>{oneDayTicketStatusMap[ticket.status]}</p>
                        <p>{ticket.jobAddress}</p>
                      </div>
                      <div css={s.trainerInfo}>
                        <img
                          src={ticket.trainerProfileImageUrl
                                ? `http://localhost:8080${ticket.trainerProfileImageUrl}?v=${Date.now()}`
                                : '/default-profile.png'
                              }
                          alt='profile'
                          onError={(e) => {
                            e.currentTarget.src = '/default-profile.png';
                          }}
                          css={s.trainerImage}
                        />
                        <p css={s.trainerName}>{ticket.trainerName}</p>
                        <p css={s.trainerId}>({ticket.trainerId})</p>
                      </div>
                    </div>
                    <div css={s.ticketBottom}>
                      <div>발급일자: {ticket.issuedAt}</div>
                    </div>
                  </article>
                ))}
                {(usedTickets.length > 0 || canceledTickets.length > 0) && (
                  <div css={s.sectionDivider} />
                )}
              </>
            )}

            {usedTickets.length > 0 && (
              <>
                <h3>사용 완료 티켓</h3>
                {usedTickets.map((ticket) => (
                  <article key={ticket.id} css={[s.ticketCard, s.getCardByStatus(ticket.status)]}>
                    <div css={s.ticketHeader}>
                      <div css={s.ticketMeta}>
                        <p>
                          체험권 번호: <span>{ticket.id}</span>
                        </p>
                        <p css={s.statusBadge}>{oneDayTicketStatusMap[ticket.status]}</p>
                        <p>{ticket.jobAddress}</p>
                      </div>
                      <div css={s.trainerInfo}>
                        <img
                          src={ticket.trainerProfileImageUrl
                                ? `http://localhost:8080${ticket.trainerProfileImageUrl}?v=${Date.now()}`
                                : '/default-profile.png'
                              }
                          alt='profile'
                          onError={(e) => {
                            e.currentTarget.src = '/default-profile.png';
                          }}
                          css={s.trainerImage}
                        />
                        <p css={s.trainerName}>{ticket.trainerName}</p>
                        <p css={s.trainerId}>({ticket.trainerId})</p>
                      </div>
                    </div>
                    <div css={s.ticketBottom}>
                      <div>발급일자: {ticket.issuedAt}</div>
                      {ticket.usedAt && <div css={s.usedButton}><b>사용일자: {ticket.usedAt}</b></div>}
                    </div>
                  </article>
                ))}
                {canceledTickets.length > 0 && <div css={s.sectionDivider} />}
              </>
            )}

            {canceledTickets.length > 0 && (
              <>
                <h3>취소된 티켓</h3>
                {canceledTickets.map((ticket) => (
                  <article key={ticket.id} css={[s.ticketCard, s.getCardByStatus(ticket.status)]}>
                    <div css={s.ticketHeader}>
                      <div css={s.ticketMeta}>
                        <p>
                          체험권 번호: <span>{ticket.id}</span>
                        </p>
                        <p css={s.statusBadge}>{oneDayTicketStatusMap[ticket.status]}</p>
                        <p>{ticket.jobAddress}</p>
                      </div>
                      <div css={s.trainerInfo}>
                        <img
                          src={ticket.trainerProfileImageUrl
                                ? `http://localhost:8080${ticket.trainerProfileImageUrl}?v=${Date.now()}`
                                : '/default-profile.png'
                              }
                          alt='profile'
                          onError={(e) => {
                            e.currentTarget.src = '/default-profile.png';
                          }}
                          css={s.trainerImage}
                        />
                        <p css={s.trainerName}>{ticket.trainerName}</p>
                        <p css={s.trainerId}>({ticket.trainerId})</p>
                      </div>
                    </div>
                    <div css={s.ticketBottom}>
                      <div>발급일자: {ticket.issuedAt}</div>
                      {ticket.canceledAt && <div css={s.cancelButton}><b>취소일자: {ticket.canceledAt}</b></div>}
                      {ticket.cancelReason && <div css={s.cancelButton}><b>취소사유: {ticket.cancelReason}</b></div>}
                    </div>
                  </article>
                ))}
              </>
            )}
          </section>
        </div>
      </div>
    </>
  );
}

export default GetMemberAllTickets;