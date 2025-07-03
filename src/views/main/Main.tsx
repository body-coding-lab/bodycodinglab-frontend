/** @jsxImportSource @emotion/react */
import React from 'react'
import * as s from "./MainStyle";

function Main() {
  return (
    <div css={s.body}>
        <div css={s.imageDiv}>
             이미지 슬라이더 영역
        </div>
        <div css={s.dirDivWrap}>
          <div>
            바로가기 1
          </div>
          <div>
            바로가기 2
          </div>
        </div>
        <h2 css={s.review}>후기 Review</h2>
        <div css={s.reviewDivWrap}>
          <div>
            리뷰1
          </div>
          <div>
            리뷰2
          </div>
        </div>
        <footer>
          <div css={s.footerSpanWrap}>
            <span>이용 약관</span>
            <span>개인정보 처리방침</span>
            <span>취소 및 환불 정책</span>
            <span>쿠키 정책</span>
          </div>
          <div css={s.footerBottomWrap}>
              <div css={s.footerLeft}>
              <div css={s.footerLogo}></div>
              <div css={s.footerBootomTextWrap}>
                <h2>FIT-MATE</h2>
                <span>저작권 정보 @ 2025 Fit-Mate. All rights reserved</span>
              </div>
            </div>
            <div css={s.othersiteLink}>
              <div>외부사이트</div>
              <div>외부사이트</div>
              <div>외부사이트</div>
            </div>
          </div>
        </footer>
    </div>
  )
}

export default Main