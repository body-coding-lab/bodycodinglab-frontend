export interface GetAllTrainersResponseDto {
  trainerId: number;
  username: string;
  name: string;
  birthdate: string;
  jobAddress: string;
  createdAt: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
}