import { atom } from 'recoil';
import { TodoBase } from 'types/todo';

export const todoState = atom<TodoBase[]>({
  key: 'todoState',
  default: [],
});