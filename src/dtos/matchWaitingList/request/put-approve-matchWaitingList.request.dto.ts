type ApprovedStatus = "NOT_APPROVED" | "APPROVED"| "REJECT";

export interface PutApproveMatchWaitingListRequestDto{
  approvedStatus: ApprovedStatus;
}