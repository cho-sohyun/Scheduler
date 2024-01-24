import React from 'react';
import { AiOutlineClose } from 'react-icons/ai';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (tag: string, color: string) => void;
}

const tagOptions = [
  { name: '일상', color: 'bg-blue-200' },
  { name: '중요', color: 'bg-red-200' },
  { name: '공부', color: 'bg-purple-200' }
];

const SelectTagModal: React.FC<Props> = ({ isOpen, onClose, onSelect }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white w-[420px] h-[180px] p-4 rounded-xl modal-box ">
        <button
          onClick={onClose}
          className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
        >
          <AiOutlineClose />
        </button>
        <h2 className="text-sm font-bold mb-5">태그 선택</h2>
        <div className="flex justify-around mb-4">
          {tagOptions.map((tag) => (
            <div
              key={tag.name}
              onClick={() => onSelect(tag.name, tag.color)}
              className="w-[80px] h-[80px] flex flex-col justify-center items-center p-2 rounded-md bg-gray-100"
            >
              <button
                className={`w-[20px] h-[20px] p-2 rounded-full ${tag.color}`}
              />
              <p className="text-center text-sm text-[#13133d] text-nowrap mt-1 cursor-pointer">
                {tag.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SelectTagModal;
