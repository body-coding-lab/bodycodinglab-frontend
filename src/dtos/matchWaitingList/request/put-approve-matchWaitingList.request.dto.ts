type ApproveStatus = "NOT_APPROVED" | "APPROVED"| "REJECT";

export interface PutApproveMatchWaitingListRequestDto{
  approveStatus: ApproveStatus;
}