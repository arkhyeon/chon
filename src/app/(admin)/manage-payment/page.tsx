import React from 'react';
import PaymentGrid from '@_admin/manage-payment/paymentGrid';
import { getPaymentHistoryList } from '@_admin/manage-payment/action';
import { PaymentSearch } from '@/src/lib/definition';

export default async function Page({
  searchParams,
}: {
  searchParams: PaymentSearch;
}) {
  const paymentHistoryList = await getPaymentHistoryList(searchParams);
  return (
    <div className="h-full w-full">
      <PaymentGrid paymentHistoryList={paymentHistoryList} />
    </div>
  );
}
