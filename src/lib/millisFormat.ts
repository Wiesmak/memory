const millisFormat = (milliseconds: number) => {
  const ms = (milliseconds % 100).toString().padStart(2, '0');
  const s = Math.floor((milliseconds / 100) % 60).toString().padStart(2, '0');
  const m = Math.floor((milliseconds / 6000) % 60).toString().padStart(2, '0');
  return `${m}:${s}:${ms}`;
}

export default millisFormat;