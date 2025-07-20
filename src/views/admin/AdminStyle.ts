/** @jsxImportsource @emorion/react */
import { css } from "@emotion/react";

export const layout = css`
  display: flex;
  height: 100vh;
`;

export const main = css`
  flex: 1;
  margin-right: 150px;
  padding: 15px;
  /* background-color: #f5f7fa; */
  box-sizing: border-box;
`;

export const mainTitle = css `
  margin-bottom: 15px;
  font-weight: bold;
  color: #3F4756;
`;

export const table = css`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
`;

export const thead = css`
  background-color: #f3f8fc;

  th {
    padding: 14px 12px;
    font-weight: bold;
    color: #3F4756;
    border-bottom: 1px solid #cfd9e0;
    text-align: center;
  }
`;

export const tbody = css`
  tr {
    &:hover {
      background-color: #f9fcff;
    }
  }

  td {
    padding: 12px 10px;
    border-bottom: 1px solid #e0e6ed;
    color: #3F4756;
    text-align: center;
    font-size: 15px;
  }

  button {
    width: 60px;
    height: 40px;
    padding: 6px 12px;
    border: none;
    border-radius: 4px;
    font-size: 14px;
    cursor: pointer;
    color: #fff;

    &.detail {
      background-color: #699ce4;

      &:hover {
        background-color: #437bc0;
      }
    }
  }
`;

export const modalBackdrop = css`
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

export const modalBox = css`
  width: 700px;
  max-height: 90vh;
  padding: 24px;
  background: white;
  border-radius: 12px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 24px;

  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #ccc;
    border-radius: 4px;
  }
`;

export const topSection = css`
  display: flex;
  justify-content: space-between;
`;

export const profileBox = css`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  overflow: hidden;
  border: 3px solid #75A7EF;

  img {
    width: 120px;
    height: 120px;
    object-fit: cover;
  }
`;

export const fieldBox = css`
  width: 500px;
  /* min-height: 240px; */
  margin-right: 15px;
  background: #f5f5f5;
  padding: 12px 16px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 10px;
`;

export const fieldRow = css`
  font-weight: bold;
  color: #3F4756;
  margin-top: 10px;
  line-height: 1.6;
  /* margin-bottom: 6px; */
`;

export const buttonContainer = css`
  display: flex;
  justify-content: space-around;
  margin-top: 20px;
`;

export const closeButton = css`
  width: 155px;
  height: 55px;
  background-color: #699CE4;
  color: #fff;
  border: none;
  padding: 10px 20px;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
  &:hover {
    background-color: #437BC0;
  }
`;

export const approveButton = css`
  width: 155px;
  height: 55px;
  background-color: #4caf50;
  color: #fff;
  border: none;
  padding: 10px 20px;
  border-radius: 8px;
  font-size: 16px;
  &:hover {
    background-color: #388e3c;
  }
`;

export const rejectButton = css`
  width: 155px;
  height: 55px;
  background-color: #f44336;
  color: #fff;
  border: none;
  padding: 10px 20px;
  border-radius: 8px;
  font-size: 16px;
  &:hover {
    background-color: #d32f2f;
  }
`;

export const changeReasonBox = css`
  margin-top: 20px;
  width: 100%;
`;

export const textarea = css`
  width: 100%;
  padding: 8px;
  font-size: 14px;
  resize: none;
  border: 1px solid #ccc;
  border-radius: 6px;
  box-sizing: border-box;
`;

export const rejectButtonGroup = css`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 12px;
`;

export const fileDownloadLink = css`
  color: inherit; 
  text-decoration: underline;
  cursor: pointer;
`;

export const filterButtonContainer = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
`;

export const filterButtonsLeft = css`
  display: flex;
  gap: 12px;
`;

export const filterButton = (active: boolean) => css`
  padding: 6px 18px;
  border: 2px solid #699CE4;
  background-color: ${active ? '#699CE4' : '#fff'};
  color: ${active ? '#fff' : '#3F4756'};
  border-radius: 20px;
  cursor: pointer;
  font-weight: 600;
  transition: background-color 0.15s ease;
  &:hover {
    background-color: ${active ? '#5C8DFF' : '#EDF3FF'};
  }
`;

export const paginationWrapper = css`
  text-align: center;
  margin-top: 20px;
`;

export const paginationButton = (active: boolean) => css`
  padding: 6px 12px;
  margin: 0 4px;
  border: 1px solid ${active ? '#699CE4' : '#ccc'};
  background-color: ${active ? '#699CE4' : '#fff'};
  color: ${active ? '#fff' : '#3F4756'};
  border-radius: 4px;
  cursor: ${active ? 'default' : 'pointer'};
  font-size: 14px;
  font-weight: 500;
  transition: background-color 0.2s ease, color 0.2s ease;

  &:hover {
    background-color: ${active ? '#5C8DFF' : '#EDF3FF'};
  }
`;

export const fullPageLoader = css`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(30, 30, 30, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.5rem;
  font-weight: 600;
  color: #FFF;
  z-index: 9999;
`;