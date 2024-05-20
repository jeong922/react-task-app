import { FC } from 'react';
import { container, description, title } from './Task.css';
import { Draggable } from 'react-beautiful-dnd';

type TaskProps = {
  index: number;
  id: string;
  taskName: string;
  taskDescription: string;
};

const Task: FC<TaskProps> = ({ taskName, taskDescription, id, index }) => {
  return (
    <Draggable draggableId={id} index={index}>
      {(provided) => (
        <div
          className={container}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <div className={title}>{taskName}</div>
          <div className={description}>{taskDescription}</div>
        </div>
      )}
    </Draggable>
  );
};

export default Task;
