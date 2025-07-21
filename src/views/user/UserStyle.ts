/** @jsxImportsource @emorion/react */
import { css } from "@emotion/react";

export const layout = css`
  display: flex;
  height: 100vh;
  justify-content: flex-start;
`;

export const main = css`
  flex: 1;
  margin-right: 150px;
  padding: 15px;
  /* background-color: #f5f7fa; */
  box-sizing: border-box;
`;

export const mainTitle = css`
  margin-bottom: 15px;
  font-weight: bold;
  color: #3F4756;
`;

export const formWrapper = css`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
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
  background-color: #ffffff;
`;

export const formSectionInformation = css`
  position: relative;
  display: flex;
  flex-direction: column;
  width: auto;
  height: auto;
  gap: 20px;
  margin-bottom: 30px;
  padding: 30px;
  border: 1px solid #C5CEE0;
  border-radius: 12px;
  background-color: #ffffff;
`;

export const formTitle = css`
  margin-bottom: 30px;
  font-size: 28px;
  font-weight: bold;
  color: #3F4756;
`;

export const form = css`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
`;

export const formLabelDeleteUser = css`
  width: 70px;
  margin-right: 15px;
  text-align: right;
  word-break: keep-all;
  white-space: normal;
  font-size: 20px;
  font-weight: bold;
  color: #3F4756;
`;

export const inputDeleteUserWrapper = css`
  width: 350px;
  height: 60px;
  padding: 0 14px;
  border: 1px solid #8F98A9;
  border-radius: 12px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  transition: border 0.3s;
  &:focus-within {
    outline: none;
    border: 3px solid #707D97;
  }
`;
export const inputDeleteUsernameWrapper = css`
  width: 350px;
  height: 60px;
  padding: 0 14px;
  border-radius: 12px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  transition: border 0.3s;
  &:focus-within {
    outline: none;
    border: 3px solid #707D97;
  }
`;

export const buttonDeleteUser = css`
  width: 500px;
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

export const formDeleteUser = css`
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  p{
    font-size: 18px;
    font-weight: 500;
    color: #3F4756;
    margin-bottom: 8px;
    line-height: 1.5;
  }
`;

export const input = css`
  flex: 1;
  border: none;
  outline: none;
  font-size: 20px;
  line-height: 1.4;
`;

export const formInfomationTitle = css`
  width: 100%;
  margin-bottom: 30px;
  text-align: left;
  font-size: 28px;
  font-weight: bold;
  color: #3F4756;
`;

export const formInfomationWarningTitle = css`
  width: 100%;
  margin-bottom: 30px;
  text-align: left;
  font-size: 18px;
  font-weight: bold;
  color: #f44336;
`;

export const formInformation = css`
  display: flex;
  align-items: center;
  margin-bottom: 30px;
`;

export const formLabel = css`
  width: 120px;
  margin-right: 15px;
  word-break: keep-all;
  white-space: normal;
  text-align: right;
  font-size: 20px;
  font-weight: bold;
  color: #707D97;
`;

export const inputUpdateWrapper = css`
  width: 540px;
  height: 60px;
  padding: 0 14px;
  line-height: 60px;
  border: 1px solid #8F98A9;
  border-radius: 12px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  transition: border 0.3s;
  &:focus-within {
    outline: none;
    border: 3px solid #707D97;
  }
`;

export const formSpan = css`
  width: auto;
  margin-right: 15px;
  word-break: keep-all;
  white-space: normal;
  text-align: right;
  font-size: 20px;
  font-weight: bold;
  color: #3F4756;
`;

export const infoBox = css`
  position: relative;
  padding: 30px;
  border: 1px solid #C5CEE0;
  border-radius: 12px;
  background-color: #ffffff;
`;

export const editButton = css`
  position: absolute;
  top: 20px;
  right: 20px;
  padding: 8px 16px;
  font-size: 20px;
  font-weight: 500;
  background-color: #699CE4;
  color: #fff;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.3s;
  &:hover {
    background-color: #437BC0;
  }
`;

export const editBottomButton = css`
  width: 100%;
  padding: 1.3rem;
  margin-bottom: 50px;
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