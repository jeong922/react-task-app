import { FC } from 'react';
import { List as listType } from '../../types';
import List from '../list/List';
import ActionButton from '../actionButton/ActionButton';

type ListContainerProps = {
  boardId: string;
  lists: listType[];
};

const ListsContainer: FC<ListContainerProps> = ({ lists, boardId }) => {
  return (
    <div>
      {lists.map((list) => (
        <List key={list.listId} list={list} boardId={boardId} />
      ))}
      <ActionButton />
    </div>
  );
};

export default ListsContainer;
