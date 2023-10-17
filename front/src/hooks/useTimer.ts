import { useEffect, useRef } from 'react';
import * as timer from '../features/timer'

const useTimer = (callback: () => void) => {
  const refNextStep = useRef(callback);

  useEffect(() => {
    refNextStep.current = callback;
  }, [callback, refNextStep]);

  useEffect(() => {
    const tick = () => refNextStep.current();
    timer.start(tick);

    return () => timer.stop();
  }, [refNextStep]);
};

export default useTimer;