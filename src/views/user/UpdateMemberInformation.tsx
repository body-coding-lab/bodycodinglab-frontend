/** @jsxImportSource @emotion/react */
import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import * as s from "./UserStyle";
import MyPageSidebar from "../sidebar/MyPageSidebar";
import { useCookies } from "react-cookie";
import { useLocation, useNavigate } from "react-router-dom";
import { UpdateMemberInfoRequestDto } from "@/dtos/user/request/update-member-info.request.dto";
import { useUserStore } from "@/stores/user.store";
import AddressModal from "../auth/AddressModal";
import { getMenuTitleByPath } from "@/utils/Menu";
import { validateUpdateMemberInfoForm } from "@/utils/UpdateUserInformation";
import { updateMemberInfoRequest } from "@/apis/user/update-member-info.api";

function UpdateMemberInformation() {
  const navigate = useNavigate();
  const [cookies] = useCookies(["accessToken"]);
  const location = useLocation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [zonecode, setZonecode] = useState<string>("");
  const [memberAddress, setMemberAddress] = useState<string>("");
  const [detailedAddress, setDetailedAddress] = useState<string>("");
  const [form, setForm] = useState({
    name: "",
  });
  const path = location.pathname;
  const member = location.state?.member;
  const menuTitle = getMenuTitleByPath(path);
  const accessToken = cookies.accessToken;
  const setName = useUserStore((state) => state.setName);
  const fullAddress = `${memberAddress} ${detailedAddress}`.trim();
  
  useEffect(() => {
    setForm((prev) => ({
      ...prev,
      memberAddress: `${memberAddress} ${detailedAddress}`.trim(),
    }));
  }, [memberAddress, detailedAddress]);

  if (!member) return <div>잘못된 접근입니다</div>;

  const handleAddressComplete = (address: string, zonecode: string) => {
    setMemberAddress(address);
    setZonecode(zonecode);
  };

  const handleDetailedAddressChange = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setDetailedAddress(event.target.value);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleEditClick = async (e: FormEvent) => {
    e.preventDefault();

    const validMessage = validateUpdateMemberInfoForm(form);

    if (validMessage) {
      alert(validMessage);
      return;
    }

    const { name } = form;

    const dto: UpdateMemberInfoRequestDto = {
        name: '',
        memberAddress: '',
    };

    if (name.trim() !== "") {
      dto.name = name.trim();
    } else {
        dto.name = member?.name || '';
    }

    if (memberAddress.trim() !== "") {
      dto.memberAddress = fullAddress;
    }

    if (Object.keys(dto).length === 0) {
      alert("변경할 항목이 없습니다.");
      return;
    }

    try {
      const response = await updateMemberInfoRequest(dto, accessToken);
      const { code, message } = response;

      if (code !== "SU") {
        alert(message);
        return;
      }

      if (form.name.trim() !== "") {
        setName(form.name);
      }

      alert("회원 정보 수정이 완료되었습니다.");
      navigate("/users/members/me");
    } catch (e) {
      console.log("회원 정보 수정 오류: ", e);
      alert("서버 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.");
    }
  };

  return (
    <>
      <div css={s.layout}>
        <MyPageSidebar />
        <div css={s.main}>
          <h2 css={s.mainTitle}>{menuTitle}</h2>
          <div css={s.formSectionInformation}>
            <button css={s.editButton} onClick={handleEditClick}>
              수정 완료
            </button>
            <h2 css={s.formInfomationTitle}>기본 정보</h2>
            <div css={s.formInformation}>
              <label css={s.formLabel}>아이디</label>
              <span css={s.formSpan}>{member.username}</span>
            </div>
            <div css={s.formInformation}>
              <label css={s.formLabel}>성명</label>
              <div css={s.inputUpdateWrapper}>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleInputChange}
                  css={s.input}
                />
              </div>
            </div>
            <div css={s.formInformation}>
              <label css={s.formLabel}>생년월일</label>
              <span css={s.formSpan}>{member.birthdate}</span>
            </div>
            <div css={s.formInformation}>
              <label css={s.formLabel}>성별</label>
              <span css={s.formSpan}>{member?.gender === 'MALE' ? '남' : '여' }</span>
            </div>
            <div css={s.formInformation}>
              <label css={s.formLabel}>휴대폰번호</label>
              <span css={s.formSpan}>{member.phone}</span>
            </div>
            <div css={s.formInformation}>
              <label css={s.formLabel}>이메일</label>
              <span css={s.formSpan}>{member.email}</span>
            </div>
          </div>
          <div css={s.formSectionInformation}>
            <h2 css={s.formInfomationTitle}>추가 정보</h2>
            <div css={s.formInformation}>
              <label css={s.formLabel}>주소</label>
              <div css={s.inputUpdateWrapper}>
                <input
                  type="text"
                  name="memberAddress"
                  value={memberAddress}
                  readOnly
                  css={s.input}
                />
                <button
                  type="button"
                  onClick={() => setIsModalOpen(true)}
                  css={s.inputButton}
                >
                  주소 찾기
                </button>
              </div>
              {isModalOpen && (
                <AddressModal
                  onClose={() => setIsModalOpen(false)}
                  onComplete={handleAddressComplete}
                />
              )}
            </div>
            <div css={s.formInformation}>
              <label css={s.formLabel}>상세 주소</label>
              <div css={s.inputUpdateWrapper}>
                <input
                  type="text"
                  placeholder="상세 주소 입력"
                  value={detailedAddress}
                  onChange={handleDetailedAddressChange}
                  css={s.input}
                />
              </div>
            </div>
          </div>
          <button css={s.editBottomButton} onClick={handleEditClick}>
            수정 완료
          </button>
        </div>
      </div>
    </>
  );
}

export default UpdateMemberInformation;