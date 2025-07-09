export interface UpdateTrainerStatusRequestDto {
  newStatus: 'APPROVED' | 'REJECTED';
  changeReason: string;
}