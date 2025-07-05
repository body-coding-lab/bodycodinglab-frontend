type CouponStatus = "NOT_USED" | "APPLICATION" | "COMPLETE" | "EXPIRED";

export interface GetMemberCouponResponseDto{
  couponId: number;
  trainerName: string;
  expirationPeriod: string;
  status: CouponStatus;
}