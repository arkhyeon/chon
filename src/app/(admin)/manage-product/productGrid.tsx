'use client';

import React, { useRef } from 'react';
import { Product } from '@prisma/client';
import { AgGridReact } from 'ag-grid-react';
import { ColDef } from 'ag-grid-community';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { deleteProductAction } from '@_admin/manage-product/add/action';
import { TextInput } from '@/src/app/components/InputGroup';

interface GridProduct extends Product {
  index: string;
}

const ProductGrid: React.FC<{ productList: Product[] }> = ({ productList }) => {
  const gridRef = useRef<AgGridReact<GridProduct>>(null);
  const router = useRouter();
  const colDefs: ColDef<GridProduct>[] = [
    {
      field: 'index',
      headerName: '',
      valueGetter: 'node.rowIndex + 1',
      width: 80,
      cellStyle: { textAlign: 'center' },
      headerCheckboxSelection: true,
      checkboxSelection: true,
    },
    {
      field: 'id',
      headerName: '',
      maxWidth: 50,
      onCellClicked: ({ data }) =>
        router.push(`/manage-product/add/${data?.id}`),
    },
    { field: 'name', headerName: '제품명' },
    { field: 'description', headerName: '설명' },
    { field: 'price', headerName: '가격' },
    { field: 'stock', headerName: '재고' },
    { field: 'createdAt', headerName: '생성일' },
    { field: 'updatedAt', headerName: '수정일' },
  ];
  const defaultColDef: ColDef = { flex: 1 };

  const deleteProduct = async () => {
    if (!window.confirm('선택된 제품들을 정말 삭제하시겠습니까?')) return;
    const selectedRows = gridRef.current!.api.getSelectedRows();
    if (selectedRows.length === 0) {
      alert('삭제할 제품을 선택해 주세요.');
      return;
    }
    const selectedRowIds = selectedRows.map((sr) => sr.id);
    await deleteProductAction(selectedRowIds);
    gridRef.current!.api.applyTransaction({ remove: selectedRows });
  };

  return (
    <div className="ag-theme-quartz-dark h-full w-full">
      <div className="flex items-center justify-between gap-4 pb-4">
        <TextInput id="query" title="구매자" />
        <div className="flex gap-2">
          <Link
            href="/manage-product/add/"
            className="rounded bg-green-500 px-4 py-2 text-white hover:bg-green-600"
          >
            제품 등록
          </Link>
          <button
            className="rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600"
            onClick={() => deleteProduct()}
          >
            삭제
          </button>
        </div>
      </div>
      <AgGridReact
        rowData={productList}
        columnDefs={colDefs}
        defaultColDef={defaultColDef}
        rowSelection="multiple"
        ref={gridRef}
        rowMultiSelectWithClick
      />
    </div>
  );
};

export default ProductGrid;
