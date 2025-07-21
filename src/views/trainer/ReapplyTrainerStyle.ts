/** @jsxImportsource @emorion/react */
import {css} from '@emotion/react'; 

export const container = css`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 60px auto;
    padding: 40px 20px;
    background-color: #FFFFFF;
`;

export const formSection = css`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: auto;
    height: auto;
    gap: 20px;
    margin-bottom: 30px;
    padding: 30px;
    border: 1px solid #C5CEE0;
    border-radius: 12px;
    background-color: #FFFFFF;
`;

export const formWrapper = css`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export const form = css`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 10px;
`;

export const formTitle = css`
    margin-bottom: 30px;
    font-size: 28px;
    font-weight: bold;
    color: #3F4756;
`;

export const formLabelResetPassword = css`
    width: 120px;
    margin-right: 15px;
    text-align: right;
    word-break: keep-all;
    white-space: normal;
    font-size: 20px;
    font-weight: bold;
    color: #3F4756;
`;

export const inputFindUsernameWrapper = css`
    width: 400px;
    height: 60px;
    padding: 0 14px;
    border: 1px solid #8F98A9;
    border-radius: 12px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    transition: border 0.2s;
    &:focus-within{
        outline: none;
        border: 3px solid #707D97;
    }
`;

export const input = css`
    flex: 1;
    border: none;
    outline: none;
    font-size: 20px;
    line-height: 1.4;
`;

export const inputButton = css`
    width: 80px;
    height: 50px;
    font-size: 18px;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    color: white;
    background-color: #699CE4;
    transition: background-color 0.3s;
    &:hover{
        background-color: #437BC0;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
    }
`;

export const buttonResetPassword = css`
    width: 480px;
    padding: 1.3rem;
    margin-top: 20px;
    font-size: 20px;
    font-weight: bold;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    color: white;
    background-color: #699CE4;
    transition: background-color 0.3s;
    &:hover {
        background-color: #437BC0;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
    }
`;