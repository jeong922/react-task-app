import { createSlice } from '@reduxjs/toolkit';
import { Task } from '../../types';

type ModalState = {
  boardId: string;
  listId: string;
  task: Task;
};

const initialState: ModalState = {
  boardId: 'Board-0',
  listId: 'list-0',
  task: {
    taskId: 'task-0',
    taskName: 'task 0',
    taskDescription: 'task description',
    taskOwner: 'jeong',
  },
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {},
});

export const modalReducer = modalSlice.reducer;
