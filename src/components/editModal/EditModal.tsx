import { ChangeEvent, useState } from 'react';
import { FiX } from 'react-icons/fi';
import { useTypedDispatch, useTypedSelector } from '../../hooks/redux';
import {
  deleteTask,
  setModalActive,
  updateTask,
} from '../../store/slices/boardsSlice';
import { addLog } from '../../store/slices/loggerSlice';
import { v4 as uuidv4 } from 'uuid';

const EditModal = () => {
  const dispatch = useTypedDispatch();
  const editingState = useTypedSelector((state) => state.modal);
  const [data, setData] = useState(editingState);

  const handleCloseButton = () => {
    dispatch(setModalActive(false));
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData({
      ...data,
      task: {
        ...data.task,
        [name]: value,
      },
    });
  };

  const handleUpdate = () => {
    console.log(editingState);
    dispatch(
      updateTask({
        boardId: editingState.boardId,
        listId: editingState.listId,
        task: data.task,
      })
    );

    dispatch(
      addLog({
        logId: uuidv4(),
        logMessage: `일 수정하기: ${editingState.task.taskName}`,
        logAuthor: 'User',
        logTimestamp: String(Date.now()),
      })
    );

    dispatch(setModalActive(false));
  };

  const handleDelete = () => {
    dispatch(
      deleteTask({
        boardId: editingState.boardId,
        listId: editingState.listId,
        taskId: editingState.task.taskId,
      })
    );

    dispatch(
      addLog({
        logId: uuidv4(),
        logMessage: `일 삭제하기: ${editingState.task.taskName}`,
        logAuthor: 'User',
        logTimestamp: String(Date.now()),
      })
    );

    dispatch(setModalActive(false));
  };

  return (
    <div>
      <div>
        <div>
          <span>{editingState.task.taskName}</span>
          <FiX onClick={handleCloseButton} />
        </div>
        <label htmlFor='taskName'>제목</label>
        <input
          type='text'
          id='taskName'
          name='taskName'
          value={data.task.taskName}
          onChange={handleChange}
        />
        <label htmlFor='taskDescription'>설명</label>
        <input
          type='text'
          id='taskDescription'
          name='taskDescription'
          value={data.task.taskDescription}
          onChange={handleChange}
        />
        <label htmlFor='taskOwner'>생성한 사람</label>
        <input
          type='text'
          id='taskOwner'
          name='taskOwner'
          value={data.task.taskOwner}
          onChange={handleChange}
        />
        <div>
          <button onClick={handleUpdate}>일 수정하기</button>
          <button onClick={handleDelete}>일 삭제하기</button>
        </div>
      </div>
    </div>
  );
};

export default EditModal;
