export interface GetTrainerAllTicketsResponseDto {
  id: number;
  trainerId: number;
  memberId: number;
  memberName: string;
  memberAddress: string;
  issuedAt: string;
  usedAt: string;
  canceledAt: string;
  cancelReason: string;
  status: 'ISSUED' | 'USED' | 'CANCELED';
}