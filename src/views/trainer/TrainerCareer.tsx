/** @jsxImportSource @emotion/react */
import { TrainerCareerRequestDto } from '@/dtos/trainer/request/trainer-career.response.dto';
import * as s from './TrainerCareerStyle';
import { deleteAllCareer, deleteCareer, getCareerList, postCareer, updateCareer } from '@/apis/trainer/trainer-career.api';
import { TrainerCareerResponseDto } from '@/dtos/trainer/response/trainer-career.response.dto';
import React, { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie';

type TrainerLicenseProps = {
onClose: () => void;
};
  
    const TrainerCareer = ({ onClose }: TrainerLicenseProps) => {
    const [cookies, setCookies] = useCookies(["accessToken"]);
    const accessToken = cookies.accessToken || "";
    const [careers, setCareers] = useState<TrainerCareerResponseDto[]>([]);
    const [form, setForm] = useState<TrainerCareerRequestDto & {id?: number}>({
      companyName: '',
      companyJoin: '',
      companyQuit: '',
    });
    const [editIndex, setEditIndex] = useState<number | null>(null);
  
    useEffect(() => {
      const fetchCareers = async () => {
        try {
          const response = await getCareerList(accessToken);
    
          if (response.code === 'SU' && response.data) {
            const careerArray = Array.isArray(response.data) ? response.data : [response.data];
            setCareers(careerArray);
          } else {
            setCareers([]);
            alert("자격증 목록이 없거나 오류 발생.");
          }
        } catch (error) {
          alert("자격증 목록 조회 실패");
          setCareers([]);
        }
      };
  
    fetchCareers();
  }, [accessToken]);
  
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setForm({ ...form, [name]: value });
    };
  
    const handleSubmit = async () => {
      if (!form.companyName || !form.companyJoin || !form.companyQuit) return;
  
      try {
        if (editIndex !== null) {
          const updated = await updateCareer(form.id!, form, accessToken);
          if (updated.code && updated.data) {
            const newCareers = [...careers];
            newCareers[editIndex] = updated.data;
            setCareers(newCareers);
            setEditIndex(null);
          } else {
            alert("경력 수정 실패.");
          }
        } else {
          const created = await postCareer(form, accessToken);
          if (created.code && created.data) {
            setCareers([...careers, created.data]);
          } else {
            alert("경력 추가 실패");
          }
        }
        setForm({ companyName: '', companyJoin: '', companyQuit: '' });
      } catch (error) {
        alert("경력 추가/수정 중 오류 발생");
      }
    };
  
    const handleEdit = (index: number) => {
      const selected = careers[index];
      if (!selected) return;
      setForm({
        id: selected.id,
        companyName: selected.companyName,
        companyJoin: selected.companyJoin,
        companyQuit: selected.companyQuit,
      });
      setEditIndex(index);
    };
  
    const handleDelete = async (id: number) => {
      try {
        const result = await deleteCareer(id, accessToken);
        if (result.code) {
          setCareers(careers.filter(c => c.id !== id));
        }
      } catch (error) {
        alert("경력 삭제 실패.");
      }
    };
  
    const handleDeleteAll = async () => {
      try {
        const result = await deleteAllCareer(accessToken);
        if (result.code) {
          setCareers([]);
        }
      } catch (error) {
        alert("전체 삭제 실패.");
      }
    };
  
    
    return (
    <div css={s.container}>
      <h2 css={s.heading}>트레이너 경력 관리</h2>
  
      <div css={s.formBox}>
        <input
          type="text"
          name="companyName"
          placeholder="회사 이름"
          value={form.companyName}
          onChange={handleChange}
          css={s.input}
        />
        <div css={s.dateRow}>
          <input
            type="date"
            name="companyJoin"
            value={form.companyJoin}
            onChange={handleChange}
            css={s.input}
          />
          <input
            type="date"
            name="companyQuit"
            value={form.companyQuit}
            onChange={handleChange}
            css={s.input}
          />
        </div>
        <button onClick={handleSubmit} css={s.submitButton}>
          {editIndex !== null ? '수정하기' : '추가하기'}
        </button>
      </div>
  
      <div>
        {careers.map((career, index) => (
          <div key={career.id ?? index} css={s.card}>
            <div css={s.cardText}>
              <div><strong>회사명:</strong> {career.companyName}</div>
              <div><strong>입사일:</strong> {career.companyJoin}</div>
              <div><strong>퇴사일:</strong> {career.companyQuit}</div>
            </div>
            <div css={s.cardButtons}>
              <button onClick={() => handleEdit(index)} className="edit">수정</button>
              <button onClick={() => handleDelete(career.id)} className="delete">삭제</button>
            </div>
          </div>
        ))}
      </div>
  
      {careers.length > 0 && (
        <button onClick={handleDeleteAll} css={s.deleteAllButton}>
          전체 삭제
        </button>
      )}
    </div>
  );
  }
  
  export default TrainerCareer;