import React, { ChangeEvent, FC, useState } from 'react';
import { FiCheck } from 'react-icons/fi';

type SideFormProps = {
  inputRef: React.RefObject<HTMLInputElement>;
  setIsFormOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const SideForm: FC<SideFormProps> = ({ setIsFormOpen, inputRef }) => {
  const [inputText, setInputText] = useState('');

  const handleChage = (e: ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
  };

  const handleOnBlur = () => {
    setIsFormOpen(false);
  };

  return (
    <div>
      <form>
        <input
          //ref={inputRef}
          autoFocus
          type='text'
          placeholder='새로운 게시판 등록하기'
          value={inputText}
          onChange={handleChage}
          onBlur={handleOnBlur}
        />
        <FiCheck />
      </form>
    </div>
  );
};

export default SideForm;
