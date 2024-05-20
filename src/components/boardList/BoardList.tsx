import React, { FC, useRef, useState } from 'react';
import { useTypedDispatch, useTypedSelector } from '../../hooks/redux';
import SideForm from './sideForm/SideForm';
import { FiLogIn, FiPlusCircle } from 'react-icons/fi';
import { GoSignOut } from 'react-icons/go';
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from 'firebase/auth';
import { app } from '../../firebase';
import {
  addSection,
  boardItem,
  boardItemActive,
  button,
  container,
  title,
} from './BoardList.css';
import clsx from 'clsx';
import { removeUser, setUser } from '../../store/slices/userSlice';
import { useAuth } from '../../hooks/useAuth';

type BoardListProps = {
  activeBoardId: string;
  setActiveBoardId: React.Dispatch<React.SetStateAction<string>>;
};

const BoardList: FC<BoardListProps> = ({ activeBoardId, setActiveBoardId }) => {
  const dispatch = useTypedDispatch();
  const { boardArray } = useTypedSelector((state) => state.boards);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const auth = getAuth(app);
  const provider = new GoogleAuthProvider();

  const { isAuth } = useAuth();

  const handleClick = () => {
    setIsFormOpen(!isFormOpen);
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  };

  const handleLogin = () => {
    signInWithPopup(auth, provider)
      .then((userCredential) => {
        dispatch(
          setUser({
            email: userCredential.user.email,
            id: userCredential.user.uid,
          })
        );
      })
      .catch(console.error);
  };

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        dispatch(removeUser());
      })
      .catch(console.error);
  };

  return (
    <div className={container}>
      <div className={title}>게시판:</div>
      {boardArray.map((board, index) => (
        <div
          key={board.boardId}
          onClick={() => setActiveBoardId(boardArray[index].boardId)}
          className={clsx(
            {
              [boardItemActive]:
                boardArray.findIndex((b) => b.boardId === activeBoardId) ===
                index,
            },
            {
              [boardItem]:
                boardArray.findIndex((b) => b.boardId === activeBoardId) !==
                index,
            }
          )}
        >
          <div>{board.boardName}</div>
        </div>
      ))}
      <div className={addSection}>
        {isFormOpen ? (
          <SideForm setIsFormOpen={setIsFormOpen} />
        ) : (
          <FiPlusCircle className={button} onClick={handleClick} />
        )}
        {isAuth ? (
          <GoSignOut className={button} onClick={handleSignOut} />
        ) : (
          <FiLogIn className={button} onClick={handleLogin} />
        )}
      </div>
    </div>
  );
};

export default BoardList;
