import React from 'react';

const useCountDown = (timeToCount : number = 60 * 1000, interval : number = 1000) => {
  const [timeLeft, setTimeLeft] = React.useState<any>(0);
  const timer : any = React.useRef({});

  const run = (ts : any) => {
    if (!timer.current.started) {
      timer.current.started = ts;
      timer.current.lastInterval = ts;
    }

    const localInterval = Math.min(interval, (timer.current.timeLeft || Infinity));
    if ((ts - timer.current.lastInterval) >= localInterval) {
      timer.current.lastInterval += localInterval;
      setTimeLeft((timeLeft : any) => {
        timer.current.timeLeft = timeLeft - localInterval;
        return timer.current.timeLeft;
      });
    }

    if (ts - timer.current.started < timer.current.timeToCount) {
      timer.current.requestId = window.requestAnimationFrame(run);
    } else {
      timer.current = {};
      setTimeLeft(0);
    }
  }

  const start : (a :number) => void = React.useCallback(
    (ttc : number) => {
      window.cancelAnimationFrame(timer.current.requestId);

      const newTimeToCount = ttc !== undefined ? ttc : timeToCount
      timer.current.started = null;
      timer.current.lastInterval = null;
      timer.current.timeToCount = newTimeToCount;
      timer.current.requestId = window.requestAnimationFrame(run);

      setTimeLeft(newTimeToCount);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  const pause : () => void = React.useCallback(
    () => {
      window.cancelAnimationFrame(timer.current.requestId);
      timer.current.started = null;
      timer.current.lastInterval = null;
      timer.current.timeToCount = timer.current.timeLeft;
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  const resume : () => void = React.useCallback(
    () => {
      if (!timer.current.started && timer.current.timeLeft > 0) {
        window.cancelAnimationFrame(timer.current.requestId);
        timer.current.requestId = window.requestAnimationFrame(run);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  const reset : () => void = React.useCallback(
    () => {
      if (timer.current.timeLeft) {
        window.cancelAnimationFrame(timer.current.requestId);
        timer.current = {};
        setTimeLeft(0);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  const actions = React.useMemo(
    () => ({ start, pause, resume, reset }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  React.useEffect(() => {
    return () => window.cancelAnimationFrame(timer.current.requestId);
  }, []);

  return [timeLeft, actions];
}

export default useCountDown;