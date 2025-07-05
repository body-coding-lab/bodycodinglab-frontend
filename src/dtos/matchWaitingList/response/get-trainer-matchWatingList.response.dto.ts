type Gender = "MALE" | "FEMALE" ;
type ApprovedStatus = "NOT_APPROVED" | "APPROVED" | "REJECT";

export interface GetTrainerMatchWaitingListResponseDto{
  matchWaitingListId: number;
  memberId: number;
  memberName: string;
  memberAge: number;
  memberGender: Gender;
  appliedAt: string;
  approvedStatus: ApprovedStatus;
}