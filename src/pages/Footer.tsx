import React from 'react';
import {
  RiHomeSmile2Line,
  RiCalendarCheckLine,
  RiAccountCircleLine
} from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';

function Footer() {
  const navigate = useNavigate();

  const goToMain = () => {
    navigate('/');
  };

  const goToCalendarPage = () => {
    navigate('/calendar');
  };

  const goToProfilePage = () => {
    navigate('/profile');
  };

  return (
    <div
      className="fixed bottom-0 left-0 right-0 flex justify-around items-center bg-[#f5f5f5] p-4"
      style={{ maxWidth: '500px', width: '100%', margin: '0 auto' }}
    >
      <button className="text-3xl" onClick={goToMain}>
        <RiHomeSmile2Line />
      </button>
      <button className="text-3xl" onClick={goToCalendarPage}>
        <RiCalendarCheckLine />
      </button>
      <button className="text-3xl" onClick={goToProfilePage}>
        <RiAccountCircleLine />
      </button>
    </div>
  );
}

export default Footer;
