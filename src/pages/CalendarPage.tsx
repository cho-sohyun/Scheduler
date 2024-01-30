import React, { useState } from 'react';
import Calendar from 'react-calendar';
import './CalendarStyle.css';

function CalendarPage() {
  const [date, setDate] = useState(new Date());

  const formatDay = (locale: string | undefined, date: Date) => {
    return date.getDate().toString(); // '일' 문자 제거
  };

  const isToday = (date: Date) => {
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  // 오늘 날짜 표시
  const tileClassName = ({ date, view }: { date: Date; view: string }) => {
    if (view === 'month' && isToday(date)) {
      return 'today';
    }
  };

  return (
    <div
      style={{
        height: '700px',
        overflow: 'auto',
        scrollbarWidth: 'none',
        msOverflowStyle: 'none'
      }}
      className="scrollbar-hide"
    >
      <Calendar
        locale="ko-KR"
        formatDay={formatDay}
        tileClassName={tileClassName}
        value={date}
      />
    </div>
  );
}

export default CalendarPage;
