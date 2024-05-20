import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Board, List, Task } from '../../types';

type BoardsState = {
  modalActive: boolean;
  boardArray: Board[];
};

type AddBoardAction = {
  board: Board;
};

type DeleteBoardAction = {
  boardId: string;
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

type DeleteTaskAction = {
  boardId: string;
  listId: string;
  taskId: string;
};

type SortAction = {
  boardIndex: number;
  droppableIdStart: string;
  droppableIdEnd: string;
  droppableIndexStart: number;
  droppableIndexEnd: number;
  draggableId: string;
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

    deleteBoard: (state, { payload }: PayloadAction<DeleteBoardAction>) => {
      state.boardArray = state.boardArray.filter(
        (board) => board.boardId !== payload.boardId
      );
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
    updateTask: (state, { payload }: PayloadAction<addTaskAction>) => {
      state.boardArray = state.boardArray.map((board) =>
        board.boardId === payload.boardId
          ? {
              ...board,
              lists: board.lists.map((list) =>
                list.listId === payload.listId
                  ? {
                      ...list,
                      tasks: list.tasks.map((task) =>
                        task.taskId === payload.task.taskId
                          ? payload.task
                          : task
                      ),
                    }
                  : list
              ),
            }
          : board
      );
    },
    deleteTask: (state, { payload }: PayloadAction<DeleteTaskAction>) => {
      state.boardArray = state.boardArray.map((board) =>
        board.boardId === payload.boardId
          ? {
              ...board,
              lists: board.lists.map((list) =>
                list.listId === payload.listId
                  ? {
                      ...list,
                      tasks: list.tasks.filter(
                        (task) => task.taskId !== payload.taskId
                      ),
                    }
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

    sort: (state, { payload }: PayloadAction<SortAction>) => {
      // same list
      if (payload.droppableIdStart === payload.droppableIdEnd) {
        const list = state.boardArray[payload.boardIndex].lists.find(
          (list) => list.listId === payload.droppableIdStart
        );
        // 변깅시키는 아이템을 배열에서 삭제
        // return 값으로 지워진 아이템을 잡아줌
        const card = list?.tasks.splice(payload.droppableIndexStart, 1);
        list?.tasks.splice(payload.droppableIndexEnd, 0, ...card!);
      }

      // other list
      if (payload.droppableIdStart !== payload.droppableIdEnd) {
        const listStart = state.boardArray[payload.boardIndex].lists.find(
          (list) => list.listId === payload.droppableIdStart
        );

        const card = listStart!.tasks.splice(payload.droppableIndexStart, 1);
        const listEnd = state.boardArray[payload.boardIndex].lists.find(
          (list) => list.listId === payload.droppableIdEnd
        );
        listEnd?.tasks.splice(payload.droppableIndexEnd, 0, ...card);
      }
    },
  },
});

export const {
  sort,
  addBoard,
  deleteBoard,
  deleteList,
  setModalActive,
  addList,
  addTask,
  updateTask,
  deleteTask,
} = boardsSlice.actions;

export const boardsReducer = boardsSlice.reducer;
