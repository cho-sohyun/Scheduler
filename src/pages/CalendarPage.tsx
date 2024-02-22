import React from 'react';
import Calendar from 'react-calendar';
import './CalendarStyle.css';
import Modal from '../components/Modal';
import TodoListModal from '../components/TodoListModal';
import { useRecoilState } from 'recoil';
import { dateState, showModalState, todoState } from '../atom/RecoilAtoms';

function CalendarPage() {
  const [date, setDate] = useRecoilState(dateState);
  const [showModal, setShowModal] = useRecoilState(showModalState);
  const [todos] = useRecoilState(todoState);
  console.log(todos);

  // 날짜를 클릭했을 때 date 상태에 설정 -> 모달 true
  const onClickDay = (date: Date) => {
    setDate(date);
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
      const todosForThisDate = todos.filter((todo) => {
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
            {todosForThisDate.map((todo) => (
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
        msOverflowStyle: 'none',
        marginTop: '12px'
      }}
      className="scrollbar-hide"
    >
      <Calendar
        onClickDay={onClickDay}
        locale="ko-KR"
        formatDay={formatDay}
        tileClassName={tileClassName}
        tileContent={tileContent}
        value={date}
      />
      {showModal && (
        <Modal closeModal={closeModal} selectedDate={date}>
          <TodoListModal />
        </Modal>
      )}
    </div>
  );
}

export default CalendarPage;
