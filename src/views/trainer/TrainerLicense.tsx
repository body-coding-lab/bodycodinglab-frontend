/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { deleteAllLicense, deleteLicense, getLicenseList, postLicense, updateLicense } from '@/apis/trainer/trainer-license.api';
import { TrainerLicenseResponseDto } from '@/dtos/trainer/response/trainer-license.response.dto';
import * as s from './TranerLisenseStyle';
import { TrainerLicenseRequestDto } from '@/dtos/trainer/request/trainer-license.response.dto';

type TrainerLicenseProps = {
  onClose: () => void;
};

const TrainerLicense = ({ onClose }: TrainerLicenseProps) => {
  const [cookies, setCookies] = useCookies(['accessToken']);
  const accessToken = cookies.accessToken || '';
  const [licenses, setLicenses] = useState<TrainerLicenseResponseDto[]>([]);
  const [form, setForm] = useState<TrainerLicenseRequestDto & { id?: number }>({
    licenseType: '',
    licenseName: '',
    files: undefined,
  });
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [fileInputKey, setFileInputKey] = useState(0);

  useEffect(() => {
    const fetchLicenses = async () => {
      try {
        const response = await getLicenseList(accessToken);

        if (response.code === 'SU' && response.data) {
          const licenseArray = Array.isArray(response.data) ? response.data : [response.data];
          setLicenses(licenseArray);
        } else {
          setLicenses([]);
          alert("자격증 목록이 없거나 오류 발생.");
        }
      } catch (error) {
        alert("자격증 목록 조회 실패.");
        setLicenses([]);
      }
    };
    fetchLicenses();
  }, [accessToken]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
  const { name, value } = e.target;
  setForm({ ...form, [name]: value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setForm((prev: TrainerLicenseRequestDto) => ({ ...prev, file: e.target.files![0] }));
    }
  };

  const handleSubmit = async (id: number) => {
    if (!form.licenseType || !form.licenseName ) return;

    try {
      if (editIndex !== null) {
        const updated = await updateLicense(id, form, accessToken);
        if (updated.code && updated.data && id !== -1) {
          const newLicenses = [...licenses];
          newLicenses[editIndex] = updated.data;
          setLicenses(newLicenses);
          setEditIndex(null);
        } else {
          alert("자격증 수정 실패.");
        }
      } else {
        const created = await postLicense(form, accessToken);
        if (created.code && created.data) {
          setLicenses([...licenses, created.data]);
        } else {
          alert("자격증 추가 실패.");
        }
      }
      setForm({ licenseType: '', licenseName: '', files: undefined });

      setFileInputKey(prev => prev + 1);
    } catch (error) {
      alert("자격증 추가/수정 중 오류 발생");
    }
  };

  const handleEdit = (index: number) => {
    const selected = licenses[index];
    if (!selected) return;
    setForm({
      id: selected.id,
      licenseType: selected.licenseType,
      licenseName: selected.licenseName,
      files: undefined,
    });
    setEditIndex(index);
  };

  const handleDelete = async (id: number) => {
    try {
      const result = await deleteLicense(id, accessToken);
      if (result.code) {
        setLicenses(licenses.filter(l => l.id !== id));
      }
    } catch (error) {
      alert("자격증 삭제 실패.");
    }
  };

  const handleDeleteAll = async () => {
    try {
      const result = await deleteAllLicense(accessToken);
      if (result.code) setLicenses([]);
    } catch (error) {
      alert("전체 삭제 실패");
    }
  };

  return (
    <div css={s.container}>
      <h2 css={s.heading}>트레이너 자격증 관리</h2>

      <div css={s.formBox}>
        <select
          name="licenseType"
          value={form.licenseType}
          onChange={handleChange}
          css={s.input}
        >
          <option value="">자격증 종류 선택</option>
          <option value="LICENSE">LICENSE</option>
          <option value="CERTIFICATE">CERTIFICATE</option>
          <option value="AWARD_DETAIL">AWARD_DETAIL</option>
        </select>
        <input
          type="text"
          name="licenseName"
          placeholder="자격증 이름"
          value={form.licenseName}
          onChange={handleChange}
          css={s.input}
        />
        <input
          key={fileInputKey} 
          type="file"
          onChange={handleFileChange}
          css={s.fileInput}
        />
        <button onClick={() => handleSubmit(form.id ?? -1)} css={s.submitButton}>
          {editIndex !== null ? '수정하기' : '추가하기'}
        </button>
      </div>

      <div>
        {licenses.map((license, index) => (
          <div key={license.id ?? index} css={s.card}>
            <div css={s.cardText}>
              <strong>{license.licenseType}</strong> - {license.licenseName}
              {license.fileName && (
                <>
                  <br />
                  <small>첨부파일: {license.fileName}</small>
                </>
              )}
            </div>
            <div css={s.cardButtons}>
              <button className="edit" onClick={() => handleEdit(index)}>수정</button>
              <button className="delete" onClick={() => handleDelete(license.id)}>삭제</button>
            </div>
          </div>
        ))}
      </div>

      {licenses.length > 0 && (
        <button onClick={handleDeleteAll} css={s.deleteAllButton}>
          전체 삭제
        </button>
      )}
    </div>
  );
};

export default TrainerLicense;