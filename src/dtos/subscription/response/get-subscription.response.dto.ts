type MemberStatus = "NOT_SUBSCRIPTION" | "SUBSCRIPTION";

export interface GetsubscriptionResponseDto {
  memberName: string;
  price: number;
  paymentDate: string;
  status: MemberStatus;
}