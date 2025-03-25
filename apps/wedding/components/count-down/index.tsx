import { useTranslation } from 'next-i18next';
import { useEffect, useState } from 'react';
import { WEDDING_DATE } from 'constants/date';
import Digit from './digit';

const SECOND_MS = 1000;
const MINUTE_MS = SECOND_MS * 60;
const HOUR_MS = MINUTE_MS * 60;
const DAY_MS = HOUR_MS * 24;

const useCountdown = (
  date: number
): null | [days: number, hours: number, minutes: number, seconds: number] => {
  const [countDown, setCountDown] = useState(-1);

  useEffect(() => {
    setCountDown(date - Date.now());
  }, [date]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCountDown(date - Date.now());
    }, 1000);

    return () => clearInterval(interval);
  }, [date]);

  if (countDown <= 0) {
    return null;
  }

  const days = Math.floor(countDown / DAY_MS);
  const hours = Math.floor((countDown % DAY_MS) / HOUR_MS);
  const minutes = Math.floor((countDown % HOUR_MS) / MINUTE_MS);
  const seconds = Math.floor((countDown % MINUTE_MS) / SECOND_MS);

  return [days, hours, minutes, seconds];
};

function CountDown() {
  const { t } = useTranslation('common');
  const time = useCountdown(WEDDING_DATE);

  if (time == null) {
    return null;
  }
  const [days, hours, minutes, seconds] = time;
  return (
    <div className="flex flex-row flex-wrap justify-center gap-6">
      <div className="flex flex-col items-center">
        <Digit value={days} />
        <p className="text-text">{t('days')}</p>
      </div>
      {[
        { label: t('hours'), value: hours },
        { label: t('minutes'), value: minutes },
        { label: t('seconds'), value: seconds },
      ].map(({ label, value }) => {
        return (
          <div key={label} className="flex flex-col items-center">
            <div className="flex flex-row gap-1">
              <Digit value={value} size={2} />
            </div>
            <p className="text-text">{label}</p>
          </div>
        );
      })}
    </div>
  );
}

export default CountDown;
