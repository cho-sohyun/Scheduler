import React from 'react';
import TodoList from '../components/TodoList';
import { PiNotepad } from 'react-icons/pi';

function Main() {
  return (
    <div>
      <div className="mt-4 min-h-screen">
        <div className="w-[460px] h-[400px] relative bg-white rounded-xl">
          <div className="flex justify-between items-center">
            <p className="flex items-center mt-4 ml-4 text-red-500">오늘</p>
            <div className="mt-4 mr-4">
              <PiNotepad className="w-[26px] h-[26px] text-gray-600 cursor-pointer" />
            </div>
          </div>
          <p className="ml-4 text-sm">오늘 날짜</p>
          <TodoList />
        </div>
      </div>
    </div>
  );
}

export default Main;
