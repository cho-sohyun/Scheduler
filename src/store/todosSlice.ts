import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Todo {
  id: number;
  text: string;
  tag: string;
  color: string;
}

const initialState: Todo[] = [];

const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodo: (
      state,
      action: PayloadAction<{ text: string; tag: string; color: string }>
    ) => {
      state.push({
        id: Date.now(),
        text: action.payload.text,
        tag: action.payload.tag,
        color: action.payload.color
      });
    }
  }
});

export const { addTodo } = todosSlice.actions;

export default todosSlice.reducer;
