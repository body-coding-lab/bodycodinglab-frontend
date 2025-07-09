export interface GetTrainerDetailResponseDto {
  trainerId: number;
  usernameL: string;
  name: string;
  birthdate: string;
  gender: 'MALE' | 'FEMALE';
  phone: string;
  email: string;
  jobAddress: string;
  attachmentFileUrl: string;
  createdAt: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  profileImageUrl?: string;
}