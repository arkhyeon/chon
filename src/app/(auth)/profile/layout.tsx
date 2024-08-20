import { ReactNode } from 'react';

export default async function layout({
  children,
  modal,
}: {
  children: ReactNode;
  modal: ReactNode;
}) {
  return (
    <div>
      {children}
      {modal}
    </div>
  );
}
