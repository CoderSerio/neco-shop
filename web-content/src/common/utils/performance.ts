export const throttle = (callback: () => void, time: number) => {
  let timeout: NodeJS.Timeout | null = null;
  return () => {
    if (!timeout) {
      timeout = setTimeout(() => {
        callback();
        clearTimeout(timeout);
        timeout = null;
      }, time);
    }
  };
};
