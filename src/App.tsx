import { useState } from 'react';
import './App.css';
import {
  appContainer,
  board,
  buttons,
  deleteBoardButton,
  loggerButton,
} from './App.css';
import BoardList from './components/boardList/BoardList';
import { useTypedDispatch, useTypedSelector } from './hooks/redux';
import EditModal from './components/editModal/EditModal';
import { LoggerModal } from './components/loggerModal/LoggerModal';
import { deleteBoard, sort } from './store/slices/boardsSlice';
import { addLog } from './store/slices/loggerSlice';
import { v4 as uuidv4 } from 'uuid';
import ModalPotal from './components/modalPotal/ModalPotal';
import { DragDropContext } from 'react-beautiful-dnd';
import ListsContainer from './components/listsContainer/ListsContainer';

function App() {
  const dispatch = useTypedDispatch();
  const [isLoggerOpen, setIsLoggerOpen] = useState(false);
  const [activeBoardId, setActiveBoardId] = useState('board-0');
  const modalActive = useTypedSelector((state) => state.boards.modalActive);
  const boards = useTypedSelector((state) => state.boards.boardArray);

  const getActiveBoard = boards.filter(
    (board) => board.boardId === activeBoardId
  )[0];

  const lists = getActiveBoard.lists;

  const handleDeleteBoard = () => {
    if (boards.length > 1) {
      dispatch(deleteBoard({ boardId: getActiveBoard.boardId }));
      dispatch(
        addLog({
          logId: uuidv4(),
          logMessage: `게시판 삭제: ${getActiveBoard.boardId}`,
          logAuthor: 'User',
          logTimestamp: String(Date.now()),
        })
      );

      const newIndexToSet = () => {
        const indexToBeDeleted = boards.findIndex(
          (board) => board.boardId === activeBoardId
        );
        return indexToBeDeleted === 0
          ? indexToBeDeleted + 1
          : indexToBeDeleted - 1;
      };

      setActiveBoardId(boards[newIndexToSet()].boardId);
    } else {
      alert('최소 게시판 개수는 한 개입니다.');
    }
  };

  const handleDragEnd = (result: any) => {
    const { destination, source, draggableId } = result;

    const sourceList = lists.filter(
      (list) => list.listId === source.droppableId
    )[0];

    dispatch(
      sort({
        boardIndex: boards.findIndex(
          (board) => board.boardId === activeBoardId
        ),
        draggableId,
        droppableIdEnd: destination.droppableId,
        droppableIdStart: source.droppableId,
        droppableIndexEnd: destination.index,
        droppableIndexStart: source.index,
      })
    );

    dispatch(
      addLog({
        logId: uuidv4(),
        logMessage: `리스트: ${sourceList.listName}에서 리스트: ${
          lists.filter((list) => list.listId === destination.droppableId)[0]
            .listName
        }으로 ${
          sourceList.tasks.filter((task) => task.taskId === draggableId)[0]
            .taskName
        }을 옮김.`,
        logAuthor: 'User',
        logTimestamp: String(Date.now()),
      })
    );
  };

  return (
    <div className={appContainer}>
      {isLoggerOpen && (
        <ModalPotal>
          <LoggerModal setIsLoggerOpen={setIsLoggerOpen} />
        </ModalPotal>
      )}
      {modalActive && (
        <ModalPotal>
          <EditModal />
        </ModalPotal>
      )}
      <BoardList
        activeBoardId={activeBoardId}
        setActiveBoardId={setActiveBoardId}
      />
      <div className={board}>
        <DragDropContext onDragEnd={handleDragEnd}>
          <ListsContainer lists={lists} boardId={getActiveBoard.boardId} />
        </DragDropContext>
      </div>
      <div className={buttons}>
        <button className={deleteBoardButton} onClick={handleDeleteBoard}>
          이 게시판 삭제하기
        </button>
        <button
          className={loggerButton}
          onClick={() => setIsLoggerOpen(!isLoggerOpen)}
        >
          {isLoggerOpen ? '활동 목록 숨기기' : '활동 목록 보이기'}
        </button>
      </div>
    </div>
  );
}

export default App;
