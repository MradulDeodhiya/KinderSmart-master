export interface TimeQuestion {
  hours: number;
  minutes: number;
  targetTimeStr: string; // e.g. "3:00" or "4:15"
}

export const generateTimeQuestion = (
  precision: 'HOUR' | 'QUARTER' | 'MINUTE', 
  level: number
): TimeQuestion => {
  // Hours: 1-12
  const hours = Math.floor(Math.random() * 12) + 1;
  let minutes = 0;

  if (precision === 'HOUR') {
    minutes = 0;
  } else if (precision === 'QUARTER') {
    // 0, 15, 30, 45
    const quarters = [0, 15, 30, 45];
    minutes = quarters[Math.floor(Math.random() * quarters.length)];
  } else if (precision === 'MINUTE') {
    // Level 1-5: 5 minute intervals (0, 5, 10...)
    // Level 6-10: 1 minute intervals could be used, but for kindergarten sticking to 5 is safer. 
    // Let's mix it up slightly for higher levels.
    if (level > 5) {
       minutes = Math.floor(Math.random() * 60);
    } else {
       minutes = Math.floor(Math.random() * 12) * 5;
    }
  }

  const minStr = minutes < 10 ? `0${minutes}` : `${minutes}`;
  return {
    hours,
    minutes,
    targetTimeStr: `${hours}:${minStr}`
  };
};