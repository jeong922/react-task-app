import { FC } from 'react';
import { container, description, title } from './Task.css';

type TaskProps = {
  index: number;
  id: string;
  boardId: string;
  taskName: string;
  taskDescription: string;
};

const Task: FC<TaskProps> = ({
  taskName,
  taskDescription,
  boardId,
  id,
  index,
}) => {
  return (
    <div className={container}>
      <div className={title}>{taskName}</div>
      <div className={description}>{taskDescription}</div>
    </div>
  );
};

export default Task;
