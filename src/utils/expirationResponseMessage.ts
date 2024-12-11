const expirateTimer = (
  setState: React.Dispatch<React.SetStateAction<string>>,
) => {
  const timer = setTimeout(() => {
    clearTimeout(timer);
    setState('');
  }, 3000);
};

export default expirateTimer;
