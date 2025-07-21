/** @jsxImportsource @emorion/react */
import { css } from "@emotion/react";

export const modalOverlay = css`
    position: fixed;
    top: 0px; 
    left: 0px; 
    right: 0px; 
    bottom: 0px;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
`;

export const modal = css`
    background-color: white;
    padding: 20px;
    border-radius: 8px;
    min-width: 300px;
    max-width: 90vw;
    max-height: 90vh;
    display: flex;
    flex-direction: column;
    position: relative;
`;

export const modalChildren = css`
    flex-grow: 1;
    overflow-y: auto;
`;

export const modalButtons = css`
    display: flex;
    justify-content: flex-end;
    margin-top: 20px;
    gap: 10px;
`