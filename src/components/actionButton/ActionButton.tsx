import { FC, useState } from 'react';
import DropDownForm from './dropDownForm/DropDownForm';
import { IoIosAdd } from 'react-icons/io';
import { listButton, taskButton } from './ActionButton.css';

type ActionButtonProps = {
  boardId: string;
  listId: string;
  list?: boolean;
};

const ActionButton: FC<ActionButtonProps> = ({ boardId, listId, list }) => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const buttonText = list ? '새로운 리스트 등록' : '새로운 일 등록';
  return isFormOpen ? (
    <DropDownForm
      setIsFormOpen={setIsFormOpen}
      list={list ? true : false}
      boardId={boardId}
      listId={listId}
    />
  ) : (
    <div
      className={list ? listButton : taskButton}
      onClick={() => setIsFormOpen(true)}
    >
      <IoIosAdd />
      <span>{buttonText}</span>
    </div>
  );
};

export default ActionButton;
