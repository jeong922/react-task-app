import { FC } from 'react';
import { List as ListType } from '../../types';
import List from '../list/List';
import ActionButton from '../actionButton/ActionButton';
import { listsContainer } from './ListsContainer.css';

type ListContainerProps = {
  boardId: string;
  lists: ListType[];
};

const ListsContainer: FC<ListContainerProps> = ({ lists, boardId }) => {
  return (
    <div className={listsContainer}>
      {lists.map((list) => (
        <List key={list.listId} list={list} boardId={boardId} />
      ))}
      <ActionButton boardId={boardId} listId={''} list />
    </div>
  );
};

export default ListsContainer;
