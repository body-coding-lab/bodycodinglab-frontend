/** @jsxImportSource @emorion/react */
import { css } from '@emotion/react';

export const headerStyle = css`
    width: 100%;
    height: 100px;
    margin-right: 15px;
    background-color: white;
    border-bottom: 3px solid #437bc0;
    box-sizing: border-box;
`;

export const header = css`
    width: 60%;
    margin: auto;
    display: flex;
    justify-content: space-between;
`;

export const logoStyle = css`
    width: 200px;
    height: 100px;
    background-image: url("/fitmatelogo.png");
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    overflow: hidden;
    cursor: pointer;
`;
export const headerNav = css`
    width: 70%;
    height: 80px;
    margin: auto;
    display: flex;
    justify-content: space-around;
    cursor: pointer;
`;
export const headerNavDivs = css`
    font-size: 32px;
    line-height: 80px;
    color: #699ce4;
`
export const loginStyle = css`
    width: 250px;
    height: 100px;
    font-size: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
    gap: 10px;
`
export const loginProfile = css`
    width: 50px;
    height: 50px;
    border-radius: 50%;
    border: 2px solid #437BC0;
    object-fit: cover;
    display: block;
    margin: 0 auto;
    cursor: pointer;

    &:hover{
        filter: brightness(1.05);
    }
`;
export const loginNoteBtn = css`
    width: 50px;
    height: 50px;
    border: none;
    border-radius: 10px;
    background-color: #699CE4;
    cursor: pointer;
    font-size: 20px;
    color: white;
`
export const logoutBtn = css`
    width: 100px;
    height: 50px;
    border: none;
    border-radius: 10px;
    background-color: #699CE4;
    cursor: pointer;
    font-size: 20px;
    color: white;
`
export const loginDefault = css`
    width: 200px;
`
export const linkStyle = css`
    text-decoration: none;
    color: #3f4756;
    margin: 0 4px;
`
export const dividerLink = css`
    margin: 0 6px;
    color: #ccc;
`