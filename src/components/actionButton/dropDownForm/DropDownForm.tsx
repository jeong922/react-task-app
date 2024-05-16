import { ChangeEvent, FC, useState } from 'react';
import { FiX } from 'react-icons/fi';
import { useTypedDispatch } from '../../../hooks/redux';
import { addList, addTask } from '../../../store/slices/boardsSlice';
import { v4 as uuidv4 } from 'uuid';
import { addLog } from '../../../store/slices/loggerSlice';

type DropDownFormProps = {
  setIsFormOpen: React.Dispatch<React.SetStateAction<boolean>>;
  list?: boolean;
  boardId: string;
  listId: string;
};

const DropDownForm: FC<DropDownFormProps> = ({
  setIsFormOpen,
  list,
  boardId,
  listId,
}) => {
  const dispatch = useTypedDispatch();
  const [text, setText] = useState('');

  const formPlaceholder = list
    ? '리스트 제목을 입력하세요.'
    : '일의 제목을 입력하세요.';

  const buttonTitle = list ? '리스트 추가하기' : '일 추가하기';

  const handleTextChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  const handleButtonClick = () => {
    if (text) {
      if (list) {
        dispatch(
          addList({
            boardId,
            list: { listId: uuidv4(), listName: text, tasks: [] },
          })
        );

        dispatch(
          addLog({
            logId: uuidv4(),
            logMessage: `리스트 생성하기: ${text}`,
            logAuthor: 'User',
            logTimestamp: String(Date.now()),
          })
        );
      } else {
        dispatch(
          addTask({
            boardId,
            listId,
            task: {
              taskId: uuidv4(),
              taskName: text,
              taskDescription: '',
              taskOwner: 'User',
            },
          })
        );
        dispatch(
          addLog({
            logId: uuidv4(),
            logMessage: `일 생성하기: ${text}`,
            logAuthor: 'User',
            logTimestamp: String(Date.now()),
          })
        );
      }
    }
  };

  return (
    <div>
      <textarea
        value={text}
        onChange={handleTextChange}
        autoFocus
        placeholder={formPlaceholder}
        onBlur={() => setIsFormOpen(false)}
      />
      <div>
        <button onMouseDown={handleButtonClick}>{buttonTitle}</button>
        <FiX />
      </div>
    </div>
  );
};

export default DropDownForm;
