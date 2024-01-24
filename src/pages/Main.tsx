import React from 'react';
import TodoList from '../components/TodoList';

function Main() {
  return (
    <div>
      <div className="flex justify-center items-center min-h-screen">
        <div className="w-[460px] h-[600px] relative bg-white rounded-xl">
          <div className="flex justify-between items-center">
            <p className="flex items-center mt-4 ml-4 text-red-500">오늘</p>
            <p>일기</p>
          </div>
          <p className="ml-4 text-sm">오늘 날짜</p>
          <TodoList />
        </div>
      </div>
    </div>
  );
}

export default Main;
