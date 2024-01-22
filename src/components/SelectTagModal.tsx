import React from 'react';

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
      <div className="bg-white w-[400px] p-4 rounded-xl">
        <h2 className="text-sm font-bold mb-5">태그 선택</h2>
        <div className="flex justify-around mb-4">
          {tagOptions.map((tag) => (
            <div
              key={tag.name}
              className="w-[80px] h-[80px] flex flex-col justify-center items-center p-2 rounded-md bg-gray-100"
            >
              <button
                onClick={() => onSelect(tag.name, tag.color)}
                className={`w-[20px] h-[20px] p-2 rounded-full ${tag.color}`}
              />
              <p
                onClick={() => onSelect(tag.name, tag.color)}
                className="text-center text-sm text-[#13133d] text-nowrap mt-1"
              >
                {tag.name}
              </p>
            </div>
          ))}
        </div>
        <button
          onClick={onClose}
          className="block w-full text-center p-2 border border-gray-300 rounded-md"
        >
          취소
        </button>
      </div>
    </div>
  );
};

export default SelectTagModal;
