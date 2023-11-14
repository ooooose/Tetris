let timerId: NodeJS.Timeout | null;
const intervalTime: number = 1000;

export const start = (callback: () => void) => {
  timerId = setInterval(callback, intervalTime);
};

export const stop = () => {
  if (timerId !== null) {
    clearInterval(timerId);
  }
};
