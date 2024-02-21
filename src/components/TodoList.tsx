import React, { useState, useEffect, useRef } from 'react';
import SelectTagModal from './SelectTagModal';
import { useRecoilState } from 'recoil';
import { editTextState, todoState, editIdState } from '../atom/RecoilAtoms';
import { useLocalStorageRecoilState } from '../utils/useLocalStorageRecoilState';

function TodoList() {
  const [todo, setTodo] = useRecoilState(todoState);
  const [editId, setEditId] = useRecoilState(editIdState);
  const [editText, setEditText] = useRecoilState(editTextState);
  const [isOpen, setIsOpen] = useState(false);
  const [tag, setTag] = useState('');
  const [color, setColor] = useState('bg-gray-200');
  const inputRef = useRef<HTMLInputElement>(null);
  const [inputText, setInputText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTodo((prevTodo) => [
      ...prevTodo,
      {
        // 할 일 추가
        id: prevTodo.length + 1, // id는 기존 할 일의 개수 + 1로 설정
        text: inputText,
        completed: false,
        tag: tag,
        color: color,
        date: new Date()
      }
    ]);
    setInputText(''); // 입력 필드 초기화
  };

  // input 요소에 포커스를 주는 코드, 사용자가 태그를 선택한 후에도 입력필드에 포커스 유지.
  useEffect(() => {
    if (!isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const handleEdit = (id: number, text: string) => {
    setEditId(id);
    setEditText(text);
  };

  const handleSave = (id: number) => {
    setTodo(
      todo.map((todo) => (todo.id === id ? { ...todo, text: editText } : todo))
    );
    setEditId(null);
  };

  const handleDelete = (id: number) => {
    setTodo((prevTodo) => prevTodo.filter((todo) => todo.id !== id));
  };

  const handleToggle = (id: number) => {
    setTodo((prevTodo) =>
      prevTodo.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  return (
    <div className="mt-5 flex flex-col justify-center items-center">
      <ul className="w-full flex flex-col items-center">
        {todo.map((todo, index) => (
          <li
            key={index}
            className={` w-[400px] h-[50px] flex justify-between items-center mt-2 p-2 pl-3 text-center text-black text-sm rounded-md opacity-60 ${todo.color}`}
          >
            {editId === todo.id ? (
              <input
                className={`h-[42px] text-sm text-black font-normal ${todo.color} rounded-md outline-none `}
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
              />
            ) : (
              <div className="flex flex-col justify-center items-start cursor-pointer">
                <p
                  className={`text-xs ${todo.completed ? 'text-gray-400' : 'text-black'}`}
                >
                  {todo.tag}
                </p>
                <span
                  className={`${todo.completed ? 'text-gray-400' : 'text-black'}`}
                  onClick={() => handleEdit(todo.id, todo.text)}
                >
                  {todo.text}
                </span>
              </div>
            )}
            <div>
              {editId === todo.id ? (
                <>
                  <button className="mr-2" onClick={() => handleSave(todo.id)}>
                    수정
                  </button>
                  <button
                    className="mr-2"
                    onClick={() => handleDelete(todo.id)}
                  >
                    삭제
                  </button>
                </>
              ) : (
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => handleToggle(todo.id)}
                  className="mr-2 mt-1 checkbox border-gray-500"
                />
              )}
            </div>
          </li>
        ))}
      </ul>
      <form onSubmit={handleSubmit} className="mb-4 w-full flex justify-center">
        <input
          ref={inputRef}
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          type="text"
          className={`w-[400px] h-[48px] flex justify-center items-center mt-4 p-2 text-sm text-black font-normal ${color} opacity-70 border border-gray-200 rounded-md outline-none`}
          placeholder="+ 할 일을 추가하세요"
          onClick={() => setIsOpen(true)}
        />
      </form>
      <SelectTagModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onSelect={(selectedTag, selectedColor) => {
          setTag(selectedTag);
          setColor(selectedColor);
          setIsOpen(false);
        }}
      />
    </div>
  );
}

export default TodoList;
