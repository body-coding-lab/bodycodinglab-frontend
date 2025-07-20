/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from "react";
import * as m from './MemberFormPageStyle';
import { useCookies } from "react-cookie";
import MyPageSidebar from "../sidebar/MyPageSidebar";
import { GetMemberFormResponseDto } from "@/dtos/memberForm/response/get-memberForm.response.dto";
import { getMenuTitleByPath } from "@/utils/Menu";
import { GetMemberFormRequest } from "@/apis/memberForm/get-memberForm.api";
import FormViewer from "./MemberFormView";
import FormWriter from "./MemberFormWriter";

const MemberFormPage = () => {
  const [formExists, setFormExists] = useState<boolean | null>(null);
  const [cookies] = useCookies(["accessToken"]);
  const [formData, setFormData] = useState<GetMemberFormResponseDto | undefined>(undefined);

  const [isWriting, setIsWriting] = useState(false);
  const path = location.pathname
  const menuTitle = getMenuTitleByPath(path);
  useEffect(() => {
    const fetchForm = async () => {
      const token = cookies.accessToken;
      if (!token) return;

      const response = await GetMemberFormRequest(token);
      if (response.code === "SU") {
        setFormExists(true);
        setFormData(response.data);
      } else {
        setFormExists(false);
      }
    };

    fetchForm();
  }, []);

  if (formExists === null) return <p>로딩 중...</p>;
  if (!formExists) {
    if (isWriting) return <FormWriter />;

    return (
      <>
        <div css={m.formContainer}>
            <MyPageSidebar/>
            <h2 css={m.title}>{menuTitle}</h2>
            <div css={m.formContainerBox}>
                <div>
                    <div  css={m.formWriteButtonContainer}> 
                        <p css={m.formWriteButtontxt}>매칭된 트레이너에게 전달할 폼을 작성하세요</p>
                        <br />
                        <button css={m.button} onClick={() => setIsWriting(true)}>폼 작성하기</button>
                    </div>
                </div>
            </div>
        </div>
      </>
    );
  }

  return (
    <>
        <div css={m.formContainer}>
            <MyPageSidebar/>
            <div css={m.formViewContainer}>
                <h2 css={m.title}>{menuTitle}</h2>
                <div>
                    <br />
                </div>
                <div style={{marginLeft: "20%", width: "100%"}}>
                    <FormViewer data={formData!}/>  
                </div>
            </div>
        </div>
    </>);
};

export default MemberFormPage;