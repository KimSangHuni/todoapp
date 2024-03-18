import { Filter } from 'components/FilterComponent';
import { atom } from 'recoil';
import { TodoBase } from 'types/todo';

export const todoState = atom<TodoBase[]>({
  key: 'todoState',
  default: [],
});

const filterList: Filter[] = [
  {
      idx:0,
      text: "중요",
      content: "favorite",
      value: false,
  }
]

export const filterState = atom<Filter[]>({
  key: 'filterState',
  default: filterList,
})