import React from 'react';

function Header() {
  return (
    <header className="flex justify-between items-center w-full h-[50px]">
      <div className="flex items-center text-xl text-gray-600">Scheduler</div>
      <div className="flex items-center">로그인</div>
    </header>
  );
}

export default Header;
