import { useCallback } from 'react';
import useMountedState from './useMountedState';

const useSafeAsync = () => {
  const isMounted = useMountedState();
  const safeAsync = useCallback(
    (promise) =>
      new Promise((resolve) => {
        promise.then((value) => {
          if (isMounted()) {
            resolve(value);
          }
        });
      }),
    [isMounted]
  );

  return safeAsync;
};

export default useSafeAsync;
