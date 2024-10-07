import { useEffect } from 'react';

const useKeyPress = (targetKey: string, callback: () => void): void => {
  const handleKeyPress = (event: KeyboardEvent): void => {
    if (event.key === targetKey) {
      callback();
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress);

    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [targetKey, callback]);
};

export default useKeyPress;
