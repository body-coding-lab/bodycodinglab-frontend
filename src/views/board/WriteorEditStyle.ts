/** @jsxImportsource @emorion/react */
import {css} from '@emotion/react'; 

export const body = css`
    width: 90%;
    margin: auto;
    display: flex;
    flex-grow: 1;
    justify-content: flex-start;
`;

export const left = css`
    margin-top: 2%;
    margin-left: 10%;
`;

export const right = css`
    margin-top: 2%;
    margin-right: 10%;
    width: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;
`;

export const head = css`
    width: 90%;
    margin-right: auto;
    color: #437BC0;
    margin-bottom: 3px;
`

export const headWrap = css`
    width: 90%;
`;

export const titleWrap = css`
    width: 90%;
    height: 50px;
    border: 3px solid #C5CEE0;
    border-radius: 10px;
    margin-bottom: 10px;
`;

export const title = css`
    padding-left: 10px;
    padding-right: 10px;
    width: 100%;
    height: 50px;
    font-size: 24px;
    &::placeholder{
        color: #3F4756;
    }
    border-style: none;
    outline: none;
    box-shadow: none;
    background: none;
`;

export const contentWrap = css`
    width: 90%;
    height: 500px;
    border: 3px solid #C5CEE0;
    border-radius: 10px 10px 0 0;
`;

export const content = css`
    padding-left: 10px;
    padding-right: 10px;
    width: 100%;
    height: 500px;
    outline: none;
    box-shadow: none;
    background-color: inherit;
    font-size: 24px;
    font-family: 'Arial';
    resize: none;
    border-style: none;
    &::placeholder{
        color: #3F4756;
    }
`;

export const file = css`
    width: 90%;
    border: 3px solid #C5CEE0;
    border-top: none;
    font-size: 16px;
    color: #437BC0;
`;

export const writeBtn = css`
    width: 90%;
    height: 40px;
    font-size: 30px;
    color: #3F4756;
    line-height: 40px;
    text-align: center;
    border: 3px solid #C5CEE0;
    border-top: 0px;
    border-radius: 0 0 10px 10px;
    cursor: pointer;
`;

export const previewWrap = css`
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
    margin-top: 16px;
`;

export const previewItem = css`
    position: relative;
    width: 100px;
    height: 100px;
`;

export const previewImage = css`
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 6px;
    border: 1px solid #ccc;
`;

export const deleteBtn = css`
    position: absolute;
    top: -5px;
    right: -5px;
    background: red;
    color: white;
    border: none;
    border-radius: 50%;
    width: 20px;
    height: 20px;
    cursor: pointer;
`;