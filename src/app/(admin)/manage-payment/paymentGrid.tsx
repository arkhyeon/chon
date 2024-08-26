'use client';

import React, { useEffect, useState } from 'react';
import { PaymentHistory, PaymentList } from '@prisma/client';
import { AgGridReact } from 'ag-grid-react';
import { ColDef } from 'ag-grid-community';
import { getPaymentList } from '@_admin/manage-payment/action';
import {
  DateRange,
  SelectInput,
  TextInput,
} from '@/src/app/components/InputGroup';
import { deliveryStatus, paymentStatus } from '@/src/lib/definition';

interface GridPaymentHistory extends PaymentHistory {
  index: string;
  user: { id: string };
  _count: { paymentList: number };
}

interface GridPaymentList extends PaymentList {
  index: string;
}

const PaymentGrid: React.FC<{ paymentHistoryList: PaymentHistory[] }> = ({
  paymentHistoryList,
}) => {
  const [paymentList, setPaymentList] = useState<PaymentList[]>([]);
  useEffect(() => setPaymentList([]), [paymentHistoryList]);

  return (
    <div className="ag-theme-quartz-dark h-full w-full">
      <div className="flex items-center gap-2 pb-4 text-black">
        <TextInput id="userid" title="구매자" />
        <SelectInput id="payment_status" title="상태">
          <option value="">전체</option>
          <option value="pending">대기</option>
          <option value="completed">완료</option>
          <option value="failed">실패</option>
          <option value="cancelled">취소</option>
          <option value="refunded">환불</option>
        </SelectInput>
        <SelectInput id="delivery_status" title="배송 상태">
          <option value="">전체</option>
          <option value="processing">대기</option>
          <option value="shipped">발송</option>
          <option value="transit">진행</option>
          <option value="delivered">완료</option>
        </SelectInput>
        <DateRange
          title="구매일시"
          startDate={{ id: 'createSdt' }}
          endDate={{ id: 'createEdt' }}
        />
      </div>
      <div className="h-1/2">
        <AgGridReact
          rowData={paymentHistoryList}
          columnDefs={historyDefs}
          defaultColDef={defaultColDef}
          rowSelection="single"
          onRowClicked={async ({ data }) =>
            setPaymentList(await getPaymentList(data.id))
          }
        />
      </div>
      <div className="h-1/2 py-4">
        <AgGridReact
          rowData={paymentList}
          columnDefs={listDefs}
          defaultColDef={defaultColDef}
        />
      </div>
    </div>
  );
};

export default PaymentGrid;

const historyDefs: ColDef<GridPaymentHistory>[] = [
  {
    field: 'id',
    headerName: '',
    maxWidth: 50,
    onCellClicked: async ({ value }) => await getPaymentList(value),
  },
  { field: 'user.id', headerName: '구매자' },
  {
    field: 'payment_status',
    headerName: '결제 상태',
    valueFormatter: ({ value }) => paymentStatus[value],
  },
  {
    field: 'delivery_status',
    headerName: '배송 상태',
    valueFormatter: ({ value }) => deliveryStatus[value],
  },
  { field: 'total', headerName: '가격' },
  { field: '_count.paymentList', headerName: '구매량' },
  { field: 'address', headerName: '주소' },
  { field: 'address_detail', headerName: '상세 주소' },
  { field: 'createdAt', headerName: '구매일시' },
  { field: 'updatedAt', headerName: '수정일' },
  { field: 'uid', hide: true },
];

const listDefs: ColDef<GridPaymentList>[] = [
  { field: 'id', headerName: '', maxWidth: 50 },
  { field: 'productName', headerName: '제품명' },
  { field: 'price', headerName: '가격' },
  { field: 'amount', headerName: '개수' },
  { field: 'pid', hide: true },
];

const defaultColDef: ColDef = { flex: 1 };
