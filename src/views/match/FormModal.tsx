/** @jsxImportSource @emotion/react */
import React from "react";
import * as f from "./FormModalStyle";
import { GetMemberFormResponseDto } from "@/dtos/memberForm/response/get-memberForm.response.dto";
import FormViewer from "../memberForm/MemberFormView";
import { GetTrainerMatchResponseDto } from "@/dtos/match/response/get-trainer-match.response.dto";


interface FormModalProps {
  isOpen: boolean;
  onClose: () => void;
  formData: GetMemberFormResponseDto | null;
  data: GetTrainerMatchResponseDto;
}

function FormModal({ isOpen, onClose, formData, data }: FormModalProps) {
  if (!isOpen || !data) return null;
  return (
    <div css={f.overlayStyle}>
      <div css={f.modalStyle} onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} style={{ float: "right" }}>
          X
        </button>
        <br />
        <img
          src={
            data.profileImageUrl
              ? `http://localhost:8080${data.profileImageUrl}`
              : '/default-profile.png'
          }
          alt="회원 프로필 이미지"
          css={f.trainerProfile}
        />
        <p>이름: {data.memberName}</p>
        <p>나이: {data.memberAge}세</p>
        <p>성별: {data.memberGender}</p>
        <p>거주지: {data.memberAddress}</p>
        <p>전화번호: {data.memberPhone}</p>
        <br />
        <br />
        {!formData ? (
          <p>작성된 폼이 존재하지 않습니다.</p>
        ) : (
          <FormViewer data={formData} />
        )}
      </div>
    </div>
  );
}

export default FormModal;