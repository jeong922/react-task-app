import { FiX } from 'react-icons/fi';
import { useTypedSelector } from '../../hooks/redux';
import { LogItem } from './logItem/LogItem';

type LoggerModalProps = {
  setIsLoggerOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export const LoggerModal = ({ setIsLoggerOpen }: LoggerModalProps) => {
  const logs = useTypedSelector((state) => state.logger.logArray);
  return (
    <div>
      <div>
        <div>
          <div>활동 기록</div>
          <FiX onClick={() => setIsLoggerOpen(false)} />
        </div>
        <div>
          {logs.map((log) => (
            <LogItem key={log.logId} logItem={log} />
          ))}
        </div>
      </div>
    </div>
  );
};
