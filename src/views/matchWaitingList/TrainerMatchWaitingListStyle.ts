/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

export const trainerMatchContainerLayout = css`
  display: flex;
  padding-top: 30px;
`;

export const trainerMatchMainBox = css`
  margin-top: 2%;
  margin-left: 15px;
  flex: 1;
`;

export const trainerMatchBox = css`
  margin-top: 5%;
`

export const trainerMatchTitle = css`
text-align: center;
color: #3F4756;
margin-right: 4%;
`;


export const trainerMatchTableWrapper = css`
  margin-top: 5%;
  display: flex;
  justify-content: center;
`;



export const trainerMatchTableStyle = css`
  width: 100%;
  border-collapse: collapse;
  background-color: #f1faff;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
`;

export const trainerMatchTableHead = css`
  background-color: #cfd9e0;
  color: #ffffff;

  th {
    padding: 14px 12px;
    font-weight: bold;
    text-align: center;
    font-size: 15px;
  }
`;

export const trainerMatchTableRow = css`
  &:hover {
    background-color: #f0f8ff;
  }
`;

export const trainerMatchTableCell = css`
  padding: 12px 10px;
  border-bottom: 1px solid #e0e6ed;
  color: #3f4756;
  text-align: center;
  font-size: 15px;
`;

export const trainerMatchButton = (status: string) => css`
  width: 90px;
  height: 40px;
  border-radius: 8px;
  margin: 0 5px;
  color: white;
  border: 1px solid white;
  font-weight: 600;
  background-color: ${
    status === "APPROVED"
      ? "#4CAF50"
      : status === "REJECT"
      ? "#d3d3d3"
      : "#699CE4"
  };
  cursor: ${status === "NOT_APPROVED" ? "pointer" : "not-allowed"};

  &:hover {
    background-color: ${
      status === "APPROVED"
        ? "#388e3c"
        : status === "REJECT"
        ? "#d3d3d3"
        : "#437BC0"
    };
    transform: ${status === "NOT_APPROVED" ? "scale(1.05)" : "none"};
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export const tdButtonCellBox = css`
  display: flex;
  justify-content: space-around;
`;

export const tdButtonCell = css`
  width: 100px;
  text-align: center;
`;

export const trainerRejectModalOverlay = css`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 1000;

  display: flex;
  align-items: center;
  justify-content: center;
`;

export const trainerRejectModalContent = css`
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  width: 400px;
  display: flex;
  flex-direction: column;
  justify-content: center;

  h3 {
    margin-bottom: 10px;
    text-align: center;
    color: #3f4756;
  }

  textarea {
    resize: none;
    padding: 10px;
    border-radius: 5px;
    border: 1px solid #ccc;
    font-size: 14px;
    width: 100%;
    box-sizing: border-box;
  }
`;

export const trainerRejectModalButtons = css`
  margin-top: 15px;
  display: flex;
  justify-content: space-between;

  button {
    padding: 8px 16px;
    border: none;
    border-radius: 5px;
    background-color: #699ce4;
    color: white;
    cursor: pointer;
    font-weight: bold;

    &:disabled {
      background-color: #ccc;
      cursor: not-allowed;
    }

    &:hover:not(:disabled) {
      background-color: #437bc0;
      transform: scale(1.05); 
    }
  }
`;