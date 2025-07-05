type ApprovedStatus = "NOT_APPROVED" | "APPROVED" | "REJECT";

export interface PutRejectMatchWaitingListRequestDto{
  approvedStatus: ApprovedStatus;
  rejectResponse: string;
}