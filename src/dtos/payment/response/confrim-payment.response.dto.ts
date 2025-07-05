type PaymentMethod = "KAKAO_PAY";
type PaymentStatus = "READY" | "SUCCESS" | "FAIL";

export interface ConfirmPaymentResponseDto{
  paymentId: number;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
}