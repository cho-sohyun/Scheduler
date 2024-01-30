import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { addTodo, editTodo, toggleTodo, deleteTodo } from '../store/todosSlice';
import SelectTagModal from './SelectTagModal';
import { RiDeleteBack2Fill } from 'react-icons/ri';

function TodoList() {
  const dispatch = useDispatch();
  const todos = useSelector((state: RootState) => state.todos);
  const [todo, setTodo] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [tag, setTag] = useState('');
  const [color, setColor] = useState('bg-gray-200');
  const inputRef = useRef<HTMLInputElement>(null);
  const [editId, setEditId] = useState<number | null>(null);
  const [editText, setEditText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (todo !== '') {
      dispatch(addTodo({ text: todo, tag, color, completed: false }));
      setTodo('');
    }
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
    dispatch(editTodo({ id, text: editText }));
    setEditId(null);
  };

  return (
    <div className="mt-5 flex flex-col justify-center items-center">
      <ul className="w-full flex flex-col items-center">
        {todos.map((todo, index) => (
          <li
            key={index}
            className={`w-[400px] h-[50px] flex justify-between items-center mt-2 p-2 pl-3 text-center text-black text-sm rounded-md opacity-60 ${todo.color}`}
          >
            {editId === todo.id ? (
              <input
                className={`h-[42px] text-sm text-black font-normal ${todo.color} rounded-md outline-none`}
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
              />
            ) : (
              <div className="flex flex-col justify-center items-start">
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
                    onClick={() => dispatch(deleteTodo(todo.id))}
                  >
                    삭제
                  </button>
                </>
              ) : (
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => dispatch(toggleTodo(todo.id))}
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
          type="text"
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
          className={`w-[400px] h-[48px] flex justify-center items-center mt-4 p-2 text-sm text-black font-normal ${color} opacity-70 border border-gray-200 rounded-md outline-none`}
          placeholder="+ 할 일을 추가하세요"
          onClick={() => {
            // 모달이 이미 열려있지 않은 경우에만 모달을 연다.
            if (!isOpen) setIsOpen(true);
          }}
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
