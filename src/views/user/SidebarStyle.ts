/** @jsxImportsource @emorion/react */
import { css } from "@emotion/react";

export const profileContainer = css`
  height: 100vh;
  padding: 30px;
  max-width: 400px;
  margin: 0 auto;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const profileTitle = css`
  font-size: 20px;
  margin-bottom: 20px;
  color: #3F4756;
`;

export const profileInput = css`
  margin-bottom: 20px;
`;

export const profileButtonGroup = css`
  display: flex;
  gap: 10px;
  justify-content: center;
`;

export const profileUpload = css`
  padding: 10px 20px;
  background-color: #4f8ef7;
  color: #fff;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: bold;
  &:hover {
    background-color: #3b76d1;
  }
`;

export const profileDelete = css`
  padding: 10px 20px;
  background-color: #e74c3c;
  color: #fff;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: bold;
  &:hover {
    background-color: #c0392b;
  }
`;