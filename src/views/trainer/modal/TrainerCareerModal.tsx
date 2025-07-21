/** @jsxImportSource @emotion/react */
import React, { ReactNode } from "react";
import * as s from './TrainerModalStyle';

type ModalProps = {
  children: ReactNode;
  onClose: () => void;
  onSave: () => void;
};

const Modal = ({ children, onClose, onSave }: ModalProps) => {
  return (
    <div
      css={s.modalOverlay}
      onClick={onClose}
    >
      <div
        css={s.modal}
        onClick={(e) => e.stopPropagation()}
      >
        <div css={s.modalChildren}>
          {children}
        </div>
        <div
          css={s.modalButtons}
        >
          <button onClick={onClose}>닫기</button>
          <button onClick={onSave}>저장</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;