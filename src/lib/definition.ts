export interface PaymentSearch {
  userid: string;
  payment_status: string;
  delivery_status: string;
  createSdt: string;
  createEdt: string;
}

export const paymentStatus: { [key: string]: string } = {
  pending: '대기',
  completed: '완료',
  failed: '실패',
  refunded: '환불',
  cancelled: '취소',
};
export const deliveryStatus: { [key: string]: string } = {
  processing: '대기',
  shipped: '발송',
  transit: '진행',
  delivered: '완료',
};
