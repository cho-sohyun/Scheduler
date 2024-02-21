import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

export interface Todo {
  id: number;
  text: string;
  tag: string;
  color: string;
  completed: boolean;
  date: Date;
}

export const todoState = atom<Todo[]>({
  key: 'todoState',
  default: [],
  effects_UNSTABLE: [persistAtom]
});

export const editIdState = atom<number | null>({
  key: 'editIdState',
  default: null
});

export const editTextState = atom<string>({
  key: 'editTextState',
  default: ''
});

export const selectedDateState = atom<Date | null>({
  key: 'selectedDateState',
  default: null
});

export const dateState = atom({
  key: 'dateState',
  default: new Date()
});

export const showModalState = atom({
  key: 'showModalState',
  default: false,
  effects_UNSTABLE: [persistAtom]
});

export const isOpenState = atom({
  key: 'isOpenState',
  default: false,
  effects_UNSTABLE: [persistAtom]
});
