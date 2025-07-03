/** @jsxImportSource @emorion/react */
import { css } from '@emotion/react';

export const body = css`
    width: 70%;
    height: auto;
    background-color: #ccc;
    margin: auto;
`
export const imageDiv = css`
    width: 100%;
    height: 550px;
    background-color: red;
    color: white;
    margin-bottom: 140px;
`
export const dirDivWrap = css`
    width: 100%;
    height: 160px;
    display: flex;
    div{
        width: 50%;
        background-color: palevioletred;
        :first-of-type{
            margin-right: 160px;
        }
    }
`
export const review = css`
    font-size: 48px;
    color: #3F4756;
    margin: 60px 0 60px 0;
`
export const reviewDivWrap = css`
    width: 100%;
    height: 460px;
    display: flex;
    margin-bottom: 80px;
    div{
        width: 50%;
        background-color: aliceblue;
        :first-of-type{
            margin-right: 30px;
        }
    }
`
export const footerSpanWrap = css`
    width: 100%;
    height: 50px;
    border-bottom: 2px solid #ccc;
    background-color: #3F4756;
    display: flex;
    flex-direction: row;
    align-items: flex-end;
    span{
        font-size: 12px;
        color: white;
        margin-right: 40px;
        margin-bottom: 5px;
        :first-of-type{
            margin-left: 5px;
        }
    }
`
export const footerBottomWrap = css`
    width: 100%;
    height: 100px;
    background-color: #3F4756;
    display: flex;
    justify-content: space-between;
`
export const footerLeft = css`
    display: flex;
    align-items: flex-end;
    gap: 10px;
`
export const footerLogo = css`
    width: 200px;
    height: 100px;
    background-image: url("/footerlogo.png");
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    overflow: hidden;
`
export const footerBootomTextWrap = css`
    height: 100%;
    font-weight: bold;
    color: white;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: flex-start;
    h2{
        font-size: 36px;
        font-style: italic;
    }
    span{
        font-size: 16px;
        margin-bottom: 5px;
    }
`
export const othersiteLink = css`
    flex: 1;
    display: flex;
    justify-content: flex-end;
    margin-top: 25px;
    div{
        width: 50px;
        height: 50px;
        margin-right: 25px;
        background-color: #ccc;
    }
`