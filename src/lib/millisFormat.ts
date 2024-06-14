const millisFormat = (milliseconds: number) => {
  const ms = milliseconds % 100;
  const s = Math.floor(milliseconds / 100) % 60;
  const m = Math.floor(milliseconds / 6000) % 60;
  const h = Math.floor(milliseconds / 360000);
  return `${h}:${m}:${s}:${ms}`;
}

export default millisFormat;