import React, { useState, useEffect, useRef } from 'react';
import SelectTagModal from './SelectTagModal';
import { useRecoilState } from 'recoil';
import {
  editTextState,
  todoState,
  editIdState,
  selectedDateState,
  isOpenState,
  Todo
} from '../atom/RecoilAtoms';
import 'react-datepicker/dist/react-datepicker.css';
import './DatePickerStyle.css';
import DatePickerModal from './DatePicker';

function TodoListModal() {
  const [selectedDate, setSelectedDate] = useRecoilState(
    selectedDateState || new Date()
  );
  const [todo, setTodo] = useRecoilState(todoState);
  const [editId, setEditId] = useRecoilState(editIdState);
  const [editText, setEditText] = useRecoilState(editTextState);
  const [isOpen, setIsOpen] = useRecoilState(isOpenState);
  const [tag, setTag] = useState('');
  const [color, setColor] = useState('bg-gray-200');
  const inputRef = useRef<HTMLInputElement>(null);
  const [inputText, setInputText] = useState('');
  const [filteredTodos, setFilteredTodos] = useState<Todo[]>([]);
  const [isDatePickerOpen, setDatePickerOpen] = useState(false);
  const [editingDateId, setEditingDateId] = useState<number | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedDate) {
      setTodo((prevTodo) => [
        ...prevTodo,
        {
          id: prevTodo.length + 1,
          text: inputText,
          completed: false,
          tag: tag,
          color: color,
          date: new Date(selectedDate)
        }
      ]);
      setInputText('');
    }
  };

  useEffect(() => {
    if (!selectedDate) {
      setSelectedDate(new Date());
    }
  }, []);

  // 모달에서는 오늘의 투두리스트 항목만 출력 -> todo의 날짜가 선택된 날짜와 같은지 확인
  useEffect(() => {
    const newFilteredTodos = todo.filter(
      (todo) =>
        todo.date &&
        selectedDate &&
        new Date(todo.date).toISOString().slice(0, 10) ===
          new Date(selectedDate).toISOString().slice(0, 10) // 일자만 비교,
    );
    // 상태 업데이트
    setFilteredTodos(newFilteredTodos);
  }, [selectedDate, todo]);
  // toLocaleDateString() 메서드 대신 toISOString() 메서드를 사용,
  // toISOString() 메서드는 날짜와 시간을 UTC 형식의 문자열로 변환하므로, 타임존에 관계없이 항상 동일한 결과를 반환

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

  const handleDateChange = (id: number, date: Date) => {
    setTodo(todo.map((todo) => (todo.id === id ? { ...todo, date } : todo)));
    setDatePickerOpen(false);
    setEditingDateId(null);
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '500px'
      }}
    >
      <div
        style={{
          overflow: 'auto',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none'
        }}
        className="scrollbar-hide mt-5 flex-grow"
      >
        <div className="flex flex-col justify-center items-center">
          <ul className="w-full flex flex-col items-center">
            {filteredTodos.map((todo, index) => (
              <li
                key={index}
                className={` w-full h-[50px] flex justify-between items-center mt-2 p-2 pl-3 text-center text-black text-sm rounded-md opacity-60 ${todo.color}`}
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
                      <button
                        className="mr-2"
                        onClick={() => handleSave(todo.id)}
                      >
                        수정
                      </button>
                      <button
                        className="mr-2"
                        onClick={() => {
                          setDatePickerOpen(true);
                          setEditingDateId(todo.id);
                        }}
                      >
                        날짜
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
        </div>
      </div>
      <div className="w-full flex justify-center">
        <form
          onSubmit={handleSubmit}
          className="mb-4 w-full flex justify-center"
        >
          <input
            ref={inputRef}
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className={`w-full h-[48px] mt-10 p-2 text-sm text-black font-normal ${color} opacity-70 border border-gray-200 rounded-md outline-none`}
            placeholder="+ 할 일을 추가하세요"
            onClick={() => {
              setIsOpen(true);
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
      <DatePickerModal
        isOpen={isDatePickerOpen}
        onClose={() => setDatePickerOpen(false)}
        selectedDate={todo.find((item) => item.id === editingDateId)?.date}
        onDateChange={(date: Date) => {
          if (editingDateId !== null) {
            handleDateChange(editingDateId, date);
          }
        }}
      />
    </div>
  );
}

export default TodoListModal;
