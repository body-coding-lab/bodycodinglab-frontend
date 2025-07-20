/** @jsxImportSource @emotion/react */
import { GetResetPasswordUserRequestDto } from '@/dtos/auth/request/get-reset-password-user.request.dto';
import * as s from "./AuthStyle";
import React, { FormEvent, useState } from 'react'
import { getResetPasswordUserRequest } from '@/apis/auth/get-reset-password-user';
import { verifyEmailRequest } from '@/apis/auth/verify-email.api';
import { validateGetUserInformationToResetPasswordForm } from '@/utils/GetUserInformationToResetPassword';

function GetResetPasswordUser() {
    const [verifyEmail, setVerifyEmail] = useState('');
    const [isSendingEmail, setIsSendingEmail] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [form, setForm] = useState({
        username: "",
        name: "",
        birthdate: "",
        email: ""
    });
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) =>{
        const {name, value} = e.target;
        setForm({...form, [name]: value});
    };
    const handleVarify = async(e: FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        const {username, name, birthdate, email} = form;
        const validMessage = validateGetUserInformationToResetPasswordForm(form);
        if(validMessage){
            alert(validMessage);
            setIsLoading(false);
            return;
        }

        try{
            const dto: GetResetPasswordUserRequestDto = {username, name, birthdate, email};
            const response = await getResetPasswordUserRequest(dto);
            const {code, message, data} = response;

            if(code !== 'SU' || !data){
                alert(message);
                return;
            }

            const {email: verifyEmail} = data;
            setVerifyEmail(verifyEmail);
            const sendEmailResponse = await verifyEmailRequest(verifyEmail);
            const {code: seCode, message: seMessage} = sendEmailResponse;

            if(seCode !== 'SU'){
                alert(seMessage);
                return;
            }
            setIsSendingEmail(true);
        }catch(e){
            alert('서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
        }finally{
            setIsLoading(false);
        }
    };

  return (
    <>
        {isLoading && (
            <div css={s.fullPageLoader}>로딩 중입니다...</div>
        )}
        {!isSendingEmail && (
            <div css={s.container}>
                <form onSubmit={handleVarify} css={s.formWrapper} >
                    <div css={s.formSection}>
                        <h2 css={s.formTitle}>비밀번호 재설정</h2>
                        <div css={s.form}>
                            <label css={s.labelFindUsername}>아이디</label>
                            <div css={s.inputFindUsernameWrapper}>
                                <input 
                                    type="text" 
                                    name="username"
                                    value={form.username}
                                    onChange={handleInputChange}
                                    css={s.input}
                                />
                            </div>
                        </div>
                        <div css={s.form}>
                            <label css={s.labelFindUsername} >성명</label>
                            <div css={s.inputFindUsernameWrapper}>
                                <input 
                                    type="text"
                                    name="name"
                                    value={form.name}
                                    onChange={handleInputChange}
                                    css={s.input}
                                />
                            </div>
                        </div>
                        <div css={s.form}>
                            <label css={s.labelFindUsername}>생년월일</label>
                            <div css={s.inputFindUsernameWrapper}>
                            <input 
                                    type="date"
                                    name="birthdate"
                                    value={form.birthdate}
                                    onChange={handleInputChange}
                                    css={s.input}
                                />
                            </div>
                        </div>
                        <div css={s.form}>
                            <label css={s.labelFindUsername}>생년월일</label>
                            <div css={s.inputFindUsernameWrapper}>
                            <input 
                                    type="email"
                                    name="email"
                                    value={form.email}
                                    onChange={handleInputChange}
                                    css={s.input}
                                />
                            </div>
                        </div>
                        <button type="submit" css={s.buttonFindUsername}>이메일 인증</button>
                    </div>
                </form>
            </div>
        )}
        {isSendingEmail && (
            <div css={s.container}>
                <div css={s.getSection}>
                    <p>이메일이 발송되었습니다.</p>
                    <p>메일을 확인해 주세요.</p>
                </div>
            </div>
        )}
    </>
  )
}

export default GetResetPasswordUser