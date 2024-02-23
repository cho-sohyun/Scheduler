import React, { ReactNode } from 'react';

interface ModalProps {
  closeModal: () => void;
  children: ReactNode;
  selectedDate: Date;
}

const Modal = ({ closeModal, children, selectedDate }: ModalProps) => {
  const date = `${selectedDate.getMonth() + 1}월 ${selectedDate.getDate()}일`;
  const dayNames = ['일', '월', '화', '수', '목', '금', '토', '일'];
  const day = dayNames[selectedDate.getDay()];

  const today = new Date();
  const diffDays = Math.ceil(
    (selectedDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
  );
  let diffText = '';
  if (diffDays === 0) {
    diffText = '오늘';
  } else if (diffDays === 1) {
    diffText = '내일';
  } else {
    diffText = `D-${diffDays}`;
  }

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50">
      <div
        className="absolute top-0 left-0 w-full h-full bg-gray-400 opacity-50"
        onClick={closeModal}
      />
      <div className="w-[420px] z-50 bg-white p-5 rounded-xl shadow-lg min-h-40">
        <p className="ml-2 text-sm">
          {date} ({day})
        </p>
        <p className="flex items-center ml-2 text-gray-500 text-xs">
          {diffText}
        </p>
        {children}
      </div>
    </div>
  );
};

export default Modal;
