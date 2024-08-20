import React from 'react';
import { useRouter } from 'next/navigation';

interface ModalProps {
  title?: string;
  children: React.ReactNode;
  onConfirm?: () => void;
  onSubmit?: boolean;
}

const Modal: React.FC<ModalProps> = ({
  title,
  children,
  onConfirm,
  onSubmit = false,
}) => {
  // if (!isOpen) return null

  const router = useRouter();

  const handleClose = () => {
    router.back();
  };

  const handleBackgroundClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      handleClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      onClick={handleBackgroundClick}
    >
      <div className="w-full overflow-hidden rounded-lg bg-white shadow-lg sm:w-3/4 md:w-2/3 lg:w-1/2 xl:w-1/4">
        {title && (
          <div className="flex items-center justify-between border-b p-4">
            <h2 className="text-xl font-semibold text-black">{title}</h2>
            <button
              type="button"
              className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-transparent text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900"
              onClick={handleClose}
              aria-label="Close modal"
            >
              <svg
                className="h-3 w-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
          </div>
        )}
        <div className="p-4">{children}</div>
        <div className="flex justify-end border-t p-4">
          <button
            type="button"
            onClick={handleClose}
            className="mr-2 rounded bg-gray-200 px-4 py-2 text-gray-700 hover:bg-gray-300"
          >
            닫기
          </button>
          <button
            onClick={onConfirm}
            type={onSubmit ? 'submit' : 'button'}
            className="rounded bg-green-500 px-4 py-2 text-white hover:bg-green-700"
          >
            확인
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
