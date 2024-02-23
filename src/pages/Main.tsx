import React from 'react';
import TodoList from '../components/TodoList';
import { PiNotepad } from 'react-icons/pi';
import { GrFormNext } from 'react-icons/gr';

function Main() {
  const today = new Date();
  const date = `${today.getMonth() + 1}월 ${today.getDate()}일`;
  const dayNames = ['일', '월', '화', '수', '목', '금', '토', '일'];
  const day = dayNames[today.getDay()];

  return (
    <div className="min-h-screen">
      <div className="mt-5 bg-white rounded-xl w-full h-[50px] flex items-center justify-between cursor-pointer">
        <div className="pl-4">
          <p>완료되지 않은 할 일이 있습니다!</p>
        </div>
        <div className="pr-4 text-2xl text-gray-600">
          <GrFormNext />
        </div>
      </div>
      <div className="mt-6 relative bg-white rounded-xl">
        <div className="flex justify-between items-center">
          <p className="flex items-center mt-4 ml-4 text-red-500">오늘</p>
          <div className="mt-4 mr-4">
            <PiNotepad className="w-[26px] h-[26px] text-gray-600 cursor-pointer" />
          </div>
        </div>
        <p className="ml-4 text-sm">
          {date} ({day})
        </p>
        <div
          style={{
            height: '700px',
            overflow: 'auto',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none'
          }}
          className="scrollbar-hide"
        >
          <TodoList />
        </div>
      </div>
    </div>
  );
}

export default Main;
