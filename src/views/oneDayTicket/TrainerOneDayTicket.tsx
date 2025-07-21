/** @jsxImportSource @emotion/react */
import { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import * as s from './OneDayTicketStyle';
import MyPageSidebar from '../sidebar/MyPageSidebar';
import IssueOneDayTicket from './IssueOneDayTicket';
import UseOneDayTicket from './UseOneDayTicket';
import CancelOneDayTicket from './CancelOneDayTicket';
import GetTrainerAllTickets from './GetTrainerAllTickets';

const TrainerOneDayTicket = () => {
  const [tab, setTab] = useState<'all' | 'issue' | 'use' | 'cancel'>('all');

  return (
    <div>
      <div css={s.layout}>
        <MyPageSidebar />
        <main css={s.main}>
          <h2 css={s.mainTitle}>🎟 체험권 관리</h2>

          <div css={s.filterButtonContainer}>
            <div css={s.filterButtonsLeft}>
              <button css={s.filterButton(tab === 'all')} onClick={() => setTab('all')}>
                전체 목록
              </button>
              <button css={s.filterButton(tab === 'issue')} onClick={() => setTab('issue')}>
                체험권 발급
              </button>
              <button css={s.filterButton(tab === 'use')} onClick={() => setTab('use')}>
                체험권 사용
              </button>
              <button css={s.filterButton(tab === 'cancel')} onClick={() => setTab('cancel')}>
                체험권 취소
              </button>
            </div>
          </div>

          {tab === 'all' && <GetTrainerAllTickets />}
          {tab === 'issue' && <IssueOneDayTicket />}
          {tab === 'use' && <UseOneDayTicket />}
          {tab === 'cancel' && <CancelOneDayTicket />}
        </main>
      </div>
    </div>
  );
};

export default TrainerOneDayTicket;