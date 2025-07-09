export interface GetTrainerInfoResponseDto {
  trainerId: number;
  username: string;
  name: string;
  birthdate: string;
  gender: 'MALE' | 'FEMALE';
  phone: string;
  email: string;
  jobAddress: string;
  attachmentFileUrl: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
}