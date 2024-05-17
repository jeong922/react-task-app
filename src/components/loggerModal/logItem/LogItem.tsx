import { LogItem as LogItemType } from '../../../types';
import { BsFillPersonFill } from 'react-icons/bs';

type LogItemProps = {
  logItem: LogItemType;
};

export const LogItem = ({ logItem }: LogItemProps) => {
  const timeOffset = new Date(Date.now() - Number(logItem.logTimestamp));

  const showOffsetTime = `${
    timeOffset.getMinutes() > 0 ? `${timeOffset.getMinutes()}m` : ''
  } ${timeOffset.getSeconds() > 0 ? `${timeOffset.getMinutes()}s ago` : ''} ${
    timeOffset.getSeconds() === 0 ? `just now` : ''
  }`;

  return (
    <div>
      <div>
        <BsFillPersonFill />
        {logItem.logAuthor}
      </div>
      <div>{logItem.logMessage}</div>
      <div>{showOffsetTime}</div>
    </div>
  );
};
