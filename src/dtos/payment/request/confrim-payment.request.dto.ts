export interface ConfirmPaymentRequestDto{
  paymentKey: string;
  orderId: string;
  provider: string;
  matchWaitingListId: number | undefined;
}