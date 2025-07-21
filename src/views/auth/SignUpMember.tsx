/** @jsxImportSource @emotion/react */
import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { SignUpMemberRequestDto } from '@/dtos/auth/request/sign-up-member.request.dto';
import { signUpMemberRequest } from '@/apis/auth/sign-up-member.api';
import { useNavigate } from 'react-router-dom';
import * as s from './AuthStyle';
import AddressModal from './AddressModal';
import { validateMemberForm } from '@/utils/SignUp';

function SignUpMember() {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [zonecode, setZonecode] = useState<string>("");
  const [memberAddress, setMemberAddress] = useState<string>("");
  const [detailedAddress, setDetailedAddress] = useState<string>("");
  const [profile, setProfile] = useState<File | null>(null);
  const [isPasswordConfirmed, setIsPasswordConfirmed] = useState(false);
  const [form, setForm] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    name: "",
    birthdate: "",
    gender: "" as "MALE" | "FEMALE",
    phone: "",
    email: "",
  });
  const fullAddress = `${memberAddress} ${detailedAddress}`.trim();

  useEffect(() => {
    setForm((prev) => ({
      ...prev,
      memberAddress: `${memberAddress} ${detailedAddress}`.trim()
    }));
  }, [memberAddress, detailedAddress]);

  const handleAddressComplete = (address: string, zonecode: string) => {
    setMemberAddress(address);
    setZonecode(zonecode);
  };

  const handleDetailedAddressChange = (event: ChangeEvent<HTMLInputElement>) => {
    setDetailedAddress(event.target.value);
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });

    if (name === 'password' || name === 'confirmPassword') setIsPasswordConfirmed(false);
  };
  
  const handleConfirmPassword = () => {
    if (form.password !== form.confirmPassword) {
      alert('비밀번호가 일치하지 않습니다.');
      setIsPasswordConfirmed(false);
      return;
    } else {
      alert('비밀번호가 일치합니다.');
      setIsPasswordConfirmed(true);
      return;
    }
  };

  const handleProfileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) setProfile(e.target.files[0]);
  };

  const handleSubmit = async(e: FormEvent) => {
    e.preventDefault();

    const validMessage = validateMemberForm(form);
    if (validMessage) {
      alert(validMessage);
      return;
    }

    if (!isPasswordConfirmed) {
      alert('비밀번호 확인 버튼을 눌러주세요.');
      return;
    }
    
    const requestBody: SignUpMemberRequestDto = {
      ...form,
      gender: form.gender,
      memberAddress: fullAddress
    };

    const formData = new FormData();
    formData.append('dto', new Blob([
      JSON.stringify(requestBody)
    ], { type: 'application/json' }));
    if (profile) formData.append('profile', profile);

    try {
      const response = await signUpMemberRequest(formData);
      const { code, message } = response;

      if (code !== 'SU') {
        alert(message);
        return;
      }
      alert('회원가입이 완료되었습니다.');
      navigate('/auth/login');
    } catch(e) {
      alert('서버 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.');
    }
  };

  return (
    <>
      <div css={s.container}>
        <form onSubmit={handleSubmit} css={s.formWrapper}>
          <div css={s.formSection}>
            <h2 css={s.formSignUpTitle}>기본 정보</h2>
            <div css={s.formSignUp}>
              <label css={s.formLabel}>아이디</label>
              <div css={s.inputSignUpWrapper}>
                <input
                  type='text'
                  name='username'
                  value={form.username}
                  onChange={handleInputChange}
                  css={s.input}
                />
              </div>
            </div>
            <div css={s.formSignUp}>
              <label css={s.formLabel}>비밀번호</label>
              <div css={s.inputSignUpWrapper}>
                <input
                  type='password'
                  name='password'
                  value={form.password}
                  onChange={handleInputChange}
                  css={s.input}
                />
              </div>
            </div>
            <div css={s.formSignUp}>
              <label css={s.formLabel}>비밀번호 확인</label>
              <div css={s.inputSignUpWrapper}>
                <input
                  type='password'
                  name='confirmPassword'
                  value={form.confirmPassword}
                  onChange={handleInputChange}
                  css={s.input}
                />
                <button type='button' onClick={handleConfirmPassword} css={s.inputButton}>
                  확인
                </button>
              </div>
            </div>
            <div css={s.formSignUp}>
              <label css={s.formLabel}>성명</label>
              <div css={s.inputSignUpWrapper}>
                <input
                  type='text'
                  name='name'
                  value={form.name}
                  onChange={handleInputChange}
                  css={s.input}
                />
              </div>
            </div>
            <div css={s.formSignUp}>
              <label css={s.formLabel}>생년월일</label>
              <div css={s.inputSignUpWrapper}>
                <input
                  type='date'
                  name='birthdate'
                  value={form.birthdate}
                  onChange={handleInputChange}
                  css={s.input}
                />
              </div>
            </div>
            <div css={s.formSignUp}>
              <label css={s.formLabel}>성별</label>
              <div css={s.genderSection}>
                <input
                  type='radio'
                  id='man'
                  name='gender'
                  value="MALE"
                  checked={form.gender === "MALE"}
                  onChange={handleInputChange}
                  css={s.hiddenRadio}
                />
                <label
                  htmlFor="man"
                  css={[s.genderButton, form.gender === "MALE" && s.genderSelection]}
                >
                  남성
                </label>

                <input
                  type='radio'
                  id='woman'
                  name='gender'
                  value="FEMALE"
                  checked={form.gender === "FEMALE"}
                  onChange={handleInputChange}
                  css={s.hiddenRadio}
                />
                <label
                  htmlFor="woman"
                  css={[s.genderButton, form.gender === "FEMALE" && s.genderSelection]}
                >
                  여성
                </label>
              </div>
            </div>
            <div css={s.formSignUp}>
              <label css={s.formLabel}>휴대폰번호</label>
              <div css={s.inputSignUpWrapper}>
                <input
                  type='text'
                  name='phone'
                  value={form.phone}
                  placeholder='010-0000-0000'
                  onChange={handleInputChange}
                  css={s.input}
                />
              </div>
            </div>
            <div css={s.formSignUp}>
              <label css={s.formLabel}>이메일</label>
              <div css={s.inputSignUpWrapper}>
                <input
                  type='email'
                  name='email'
                  value={form.email}
                  placeholder='example@example.com'
                  onChange={handleInputChange}
                  css={s.input}
                />
              </div>
            </div>
          </div>
          <div css={s.formSection}>
            <h2 css={s.formSignUpTitle}>추가 정보</h2>
            <div css={s.formSignUp}>
              <label css={s.formLabel}>주소</label>
              <div css={s.inputSignUpWrapper}>
                <input
                  type='text'
                  name='memberAddress'
                  value={memberAddress}
                  readOnly
                  css={s.input}
                />
                <button
                  type='button'
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
            <div css={s.formSignUp}>
              <label css={s.formLabel}>상세 주소</label>
              <div css={s.inputSignUpWrapper}>
                <input
                  type='text'
                  placeholder='상세 주소 입력'
                  value={detailedAddress}
                  onChange={handleDetailedAddressChange}
                  css={s.input}
                />
              </div>
            </div>
          </div>
          <div css={s.formSection}>
            <h2 css={s.formSignUpTitle}>선택 정보</h2>
            <div css={s.formSignUp}>
              <label css={s.formLabel}>프로필 사진</label>
              <div css={s.inputSignUpWrapper}>
                <input
                  type='file'
                  name='profile'
                  onChange={handleProfileChange}
                  css={s.input}
                />
              </div>
            </div>       
          </div>
          <button type='submit' css={s.buttonSignUp}>
            가입하기
          </button>
        </form>
      </div>
    </>
  )
}

export default SignUpMember;