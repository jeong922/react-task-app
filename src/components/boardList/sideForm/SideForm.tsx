import React, { ChangeEvent, FC, useState } from 'react';
import { FiCheck } from 'react-icons/fi';
import { button, icon, input, sideForm } from './SideForm.css';
import { useTypedDispatch } from '../../../hooks/redux';
import { addBoard } from '../../../store/slices/boardsSlice';
import { v4 as uuidv4 } from 'uuid';
import { addLog } from '../../../store/slices/loggerSlice';

type SideFormProps = {
  setIsFormOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const SideForm: FC<SideFormProps> = ({ setIsFormOpen }) => {
  const [inputText, setInputText] = useState('');

  const dispatch = useTypedDispatch();

  const handleChage = (e: ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
  };

  const handleOnBlur = () => {
    setIsFormOpen(false);
  };

  const handleClick = () => {
    if (inputText) {
      dispatch(
        addBoard({
          board: { boardId: uuidv4(), boardName: inputText, lists: [] },
        })
      );

      dispatch(
        addLog({
          logId: uuidv4(),
          logMessage: `게시판 등록: ${inputText}`,
          logAuthor: 'User',
          logTimestamp: String(Date.now()),
        })
      );
    }
    setInputText('');
  };

  return (
    <div>
      <div className={sideForm}>
        <input
          autoFocus
          className={input}
          type='text'
          placeholder='새로운 게시판 등록하기'
          value={inputText}
          onChange={handleChage}
          onBlur={handleOnBlur} // 이벤트 순서 : onBlur onMouseDown onMouseUp onClick
        />
        <button className={button}>
          <FiCheck className={icon} onMouseDown={handleClick} />
        </button>
      </div>
    </div>
  );
};

export default SideForm;
