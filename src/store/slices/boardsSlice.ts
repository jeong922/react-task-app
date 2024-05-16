import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Board, List, Task } from '../../types';

type BoardsState = {
  modalActive: boolean;
  boardArray: Board[];
};

type AddBoardAction = {
  board: Board;
};

type DeleteListAction = {
  boardId: string;
  listId: string;
};

type AddListAction = {
  boardId: string;
  list: List;
};

type addTaskAction = {
  boardId: string;
  listId: string;
  task: Task;
};

const initialState: BoardsState = {
  modalActive: false,
  boardArray: [
    {
      boardId: 'board-0',
      boardName: '첫 번째 게시물',
      lists: [
        {
          listId: 'list-0',
          listName: 'List 1',
          tasks: [
            {
              taskId: 'task-0',
              taskName: 'Task 1',
              taskDescription: 'Description',
              taskOwner: 'jeong',
            },
            {
              taskId: 'task-1',
              taskName: 'Task 2',
              taskDescription: 'Description',
              taskOwner: 'jeong',
            },
          ],
        },
        {
          listId: 'list-1',
          listName: 'List 2',
          tasks: [
            {
              taskId: 'task-3',
              taskName: 'Task 3',
              taskDescription: 'Description',
              taskOwner: 'jeong',
            },
          ],
        },
      ],
    },
  ],
};

const boardsSlice = createSlice({
  name: 'boards',
  initialState,
  reducers: {
    addBoard: (state, { payload }: PayloadAction<AddBoardAction>) => {
      state.boardArray.push(payload.board); // 불변성 신경 안써도 됨 -> 내부에서 immer 라이브러리를 사용하고 있음
    },

    addList: (state, { payload }: PayloadAction<AddListAction>) => {
      state.boardArray.map((board) =>
        board.boardId === payload.boardId
          ? { ...board, lists: board.lists.push(payload.list) }
          : board
      );
    },
    addTask: (state, { payload }: PayloadAction<addTaskAction>) => {
      state.boardArray.map((board) =>
        board.boardId === payload.boardId
          ? {
              ...board,
              lists: board.lists.map((list) =>
                list.listId === payload.listId
                  ? { ...list, tasks: list.tasks.push(payload.task) }
                  : list
              ),
            }
          : board
      );
    },
    deleteList: (state, { payload }: PayloadAction<DeleteListAction>) => {
      state.boardArray = state.boardArray.map((board) =>
        board.boardId === payload.boardId
          ? {
              ...board,
              lists: board.lists.filter(
                (list) => list.listId !== payload.listId
              ),
            }
          : board
      );
    },
    setModalActive: (state, { payload }: PayloadAction<boolean>) => {
      state.modalActive = payload;
    },
  },
});

export const { addBoard, deleteList, setModalActive, addList, addTask } =
  boardsSlice.actions;

export const boardsReducer = boardsSlice.reducer;
