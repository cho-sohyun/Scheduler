import React, { useState } from 'react';
import Calendar from 'react-calendar';
import './CalendarStyle.css';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { Todo } from '../store/todosSlice';

function CalendarPage() {
  const [date, setDate] = useState(new Date());
  const todos = useSelector((state: RootState) => state.todos);

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

  // 캘린더에 todoList 표시
  const tileContent = ({ date, view }: { date: Date; view: string }) => {
    if (view === 'month') {
      const todosForThisDate = todos.filter(
        (todo: Todo) =>
          todo.date.getDate() === date.getDate() &&
          todo.date.getMonth() === date.getMonth() &&
          todo.date.getFullYear() === date.getFullYear()
      );

      return (
        <div className="flex flex-col items-center">
          <div className="mt-2">
            {todosForThisDate.map((todo: Todo) => (
              <div key={todo.id} className={`p-1 rounded ${todo.color} mt-1`}>
                <p className="text-[10px] text-nowrap">
                  {todo.text.substring(0, 5)}
                </p>
              </div>
            ))}
          </div>
        </div>
      );
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
        tileContent={tileContent}
        locale="ko-KR"
        formatDay={formatDay}
        tileClassName={tileClassName}
        value={date}
      />
    </div>
  );
}

export default CalendarPage;
