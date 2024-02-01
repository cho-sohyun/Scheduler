import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Todo {
  id: number;
  text: string;
  tag: string;
  color: string;
  completed: boolean;
  date: string;
}

interface TodosState {
  todos: Todo[];
  selectedDate: string | null;
}

const initialState: TodosState = {
  todos: [],
  selectedDate: null
};

const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodo: {
      reducer: (state, action: PayloadAction<Omit<Todo, 'id' | 'date'>>) => {
        state.todos.push({
          id: Date.now(),
          date: state.selectedDate || new Date().toISOString(),
          ...action.payload,
          completed: false
        });
      },
      prepare: (todo: Omit<Todo, 'id' | 'date'>) => ({ payload: todo })
    },
    toggleTodo: (state, action: PayloadAction<number>) => {
      const todo = state.todos.find((todo) => todo.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
      }
    },
    deleteTodo: (state, action: PayloadAction<number>) => {
      const index = state.todos.findIndex((todo) => todo.id === action.payload);
      if (index !== -1) {
        state.todos.splice(index, 1);
      }
    },
    editTodo: (state, action: PayloadAction<{ id: number; text: string }>) => {
      const todo = state.todos.find((todo) => todo.id === action.payload.id);
      if (todo) {
        todo.text = action.payload.text;
      }
    },
    setSelectedDate: (state, action: PayloadAction<string>) => {
      state.selectedDate = action.payload;
    }
  }
});

export const { addTodo, toggleTodo, deleteTodo, editTodo, setSelectedDate } =
  todosSlice.actions;

export default todosSlice.reducer;
