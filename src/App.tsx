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
import ListsContainer from './components/listsContainer/ListsContainer';
import { useTypedSelector } from './hooks/redux';
import EditModal from './components/editModal/EditModal';
import { LoggerModal } from './components/loggerModal/LoggerModal';

function App() {
  const [isLoggerOpen, setIsLoggerOpen] = useState(false);
  const [activeBoardId, setActiveBoardId] = useState('board-0');
  const modalActive = useTypedSelector((state) => state.boards.modalActive);
  const boards = useTypedSelector((state) => state.boards.boardArray);
  const getActiveBoard = boards.filter(
    (board) => board.boardId === activeBoardId
  )[0];

  const lists = getActiveBoard.lists;

  return (
    <div className={appContainer}>
      {isLoggerOpen ? <LoggerModal setIsLoggerOpen={setIsLoggerOpen} /> : null}
      {modalActive ? <EditModal /> : null}
      <BoardList
        activeBoardId={activeBoardId}
        setActiveBoardId={setActiveBoardId}
      />
      <div className={board}>
        <ListsContainer lists={lists} boardId={getActiveBoard.boardId} />
      </div>
      <div className={buttons}>
        <button className={deleteBoardButton}>이 게시판 삭제하기</button>
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
