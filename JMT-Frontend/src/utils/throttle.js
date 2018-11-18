export default throttle = (func, delay = 0) => {
  let timeoutId = null;

  return () => {
    if (timeoutId === null) {
      timeoutId = setTimeout(() => timeoutId = null, delay);
      func();
    }
  };
};
