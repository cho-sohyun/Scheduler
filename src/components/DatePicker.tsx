import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './DatePickerStyle.css';
import { ko } from 'date-fns/locale';

interface DatePickerModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedDate: Date | undefined;
  onDateChange: (date: Date) => void;
}

function DatePickerModal({
  isOpen,
  onClose,
  selectedDate,
  onDateChange
}: DatePickerModalProps) {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="z-10 fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white w-full h-[440px] p-4 rounded-xl modal-box">
        <div onClick={onClose}>&times;</div>
        <DatePicker
          inline
          locale={ko}
          selected={selectedDate}
          onChange={onDateChange}
          dateFormat="yyyy년 MM월 dd일"
        />
      </div>
    </div>
  );
}

export default DatePickerModal;
