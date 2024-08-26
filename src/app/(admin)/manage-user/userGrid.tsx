'use client';

import React, { useRef } from 'react';
import { User } from '@prisma/client';
import { AgGridReact, CustomCellRendererProps } from 'ag-grid-react';
import { ColDef } from 'ag-grid-community';
import { TbCrown } from 'react-icons/tb';
import { deleteUser, setUserPoint } from '@_admin/manage-user/action';
import { TextInput } from '@/src/app/components/InputGroup';

interface GridProduct extends User {
  index: string;
}

const UserGrid: React.FC<{ userList: User[] }> = ({ userList }) => {
  const gridRef = useRef<AgGridReact<GridProduct>>(null);

  const deleteProduct = async () => {
    if (!window.confirm('선택된 사용자들을 정말 삭제하시겠습니까?')) return;
    const selectedRows = gridRef.current!.api.getSelectedRows();
    if (selectedRows.length === 0) {
      alert('삭제할 사용자를 선택해 주세요.');
      return;
    }
    const selectedRowIds = selectedRows.map((sr) => sr.uid);
    await deleteUser(selectedRowIds);
    gridRef.current!.api.applyTransaction({ remove: selectedRows });
  };

  return (
    <div className="ag-theme-quartz-dark h-full w-full">
      <div className="flex items-center justify-between gap-4 pb-4">
        <TextInput id="query" title="사용자" />
        <button
          className="rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600"
          onClick={() => deleteProduct()}
        >
          삭제
        </button>
      </div>
      <AgGridReact
        rowData={userList}
        columnDefs={colDefs}
        defaultColDef={defaultColDef}
        rowSelection="multiple"
        ref={gridRef}
        rowMultiSelectWithClick
        stopEditingWhenCellsLoseFocus
      />
    </div>
  );
};

export default UserGrid;
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
    headerName: '사용자명',
    cellRenderer: (props: CustomCellRendererProps) => (
      <div className="flex-cc gap-1">
        {props.data.role === 'ADMIN' ? <TbCrown color="yellow" /> : ''}
        {props.value}
      </div>
    ),
  },
  { field: 'username', headerName: '이름' },
  { field: 'email', headerName: '이메일' },
  { field: 'address', headerName: '주소' },
  { field: 'addressDetail', headerName: '상세주소' },
  {
    field: 'point',
    headerName: '포인트',
    editable: true,
    cellDataType: 'number',
    onCellValueChanged: async (props) => {
      console.log(props);
      if (props.newValue === null) {
        props.node!.setDataValue('point', props.oldValue);
        return;
      }
      await setUserPoint(props.data.uid, props.newValue);
      alert('포인트가 지급되었습니다.');
    },
  },
  {
    field: 'createdAt',
    headerName: '생성일',
    valueFormatter: ({ value }) => value.toLocaleString(),
  },
  {
    field: 'updatedAt',
    headerName: '수정일',
    valueFormatter: ({ value }) => value.toLocaleString(),
  },
  { field: 'uid', hide: true },
  { field: 'role', hide: true },
];
const defaultColDef: ColDef = { flex: 1 };
