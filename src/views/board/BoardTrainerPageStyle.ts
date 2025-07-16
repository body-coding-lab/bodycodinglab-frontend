/** @jsxImportSource @emotion/react */
import {css} from '@emotion/react'; 

export const body = css`
    width: 1090px;
    margin: auto;
    min-height: 600px;
    margin-top: 20px;
    border: 3px solid #ccc;
    border-radius: 10px;
`

export const boardListWrap = css`
    width: 1090px;
    height: auto;
    margin: auto;
    display: flex;
    flex-wrap: wrap;
    gap: 10px 2%;
    align-items: flex-start;
    justify-content: space-between;
`

export const noMatch = css`
    font-size: 24px;
    margin: auto;
    padding-top: 40px;
    color: #3F4756;
`

export const boardList = css`
    width: 40%;
    height: 40px;
    padding: 12px 16px;
    margin-left: 60px;
    display: flex;
    font-size: 18px;
    align-items: center;
    p{
        color: #3F4756;
        margin-right: 20px;
    }
    button{
        width: 120px;
        height: 30px;
        font-size: 20px;
        color: #3F4756;
        background-color: #699CE4;
        border: none;
        border-radius: 10px;
    }
`