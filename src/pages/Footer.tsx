import React from 'react';
import {
  RiHomeSmile2Line,
  RiCalendarCheckLine,
  RiAccountCircleLine
} from 'react-icons/ri';

function Footer() {
  return (
    <div
      className="fixed bottom-0 left-0 right-0 flex justify-around items-center bg-[#f5f5f5] p-4"
      style={{ maxWidth: '500px', width: '100%', margin: '0 auto' }}
    >
      <button className="text-3xl">
        <RiHomeSmile2Line />
      </button>
      <button className="text-3xl">
        <RiCalendarCheckLine />
      </button>
      <button className="text-3xl">
        <RiAccountCircleLine />
      </button>
    </div>
  );
}

export default Footer;
