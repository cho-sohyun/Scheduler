import React, { useState } from 'react';
import Calendar from 'react-calendar';
import './CalendarStyle.css';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { Todo, setSelectedDate } from '../store/todosSlice';
import Modal from '../components/Modal';
import TodoListModal from '../components/TodoListModal';

function CalendarPage() {
  const [date, setDate] = useState(new Date());
  const todos = useSelector((state: RootState) => state.todos.todos);
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();

  // 날짜를 클릭했을 때 date 상태에 설정 -> setSelectedDate 액션 디스패치하여 Redux store에 선택된 날짜를 저장한 후 모달 true
  const onClickDay = (date: Date) => {
    setDate(date);
    dispatch(setSelectedDate(date.toISOString()));
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false); // 모달을 닫는 함수
  };

  // '일' 문자 제거
  const formatDay = (locale: string | undefined, date: Date) => {
    return date.getDate().toString();
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
      const todosForThisDate = todos.filter((todo: Todo) => {
        const todoDate = new Date(todo.date);
        return (
          todoDate.getDate() === date.getDate() &&
          todoDate.getMonth() === date.getMonth() &&
          todoDate.getFullYear() === date.getFullYear()
        );
      });

      return (
        <div className="flex flex-col items-center">
          <div className="mt-2">
            {todosForThisDate.map((todo: Todo) => (
              <div
                key={todo.id}
                className={`p-1 rounded ${todo.color} mt-1 ${todo.completed ? 'opacity-40' : 'text-black'}`}
              >
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
        onClickDay={onClickDay}
        tileContent={tileContent}
        locale="ko-KR"
        formatDay={formatDay}
        tileClassName={tileClassName}
        value={date}
      />
      {showModal && (
        <Modal closeModal={closeModal} selectedDate={date}>
          <TodoListModal selectedDate={date} />
        </Modal>
      )}
    </div>
  );
}

export default CalendarPage;
