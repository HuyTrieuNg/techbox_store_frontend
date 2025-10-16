import React, { useState, useEffect } from 'react';

const Countdown = () => {
  const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0 });

  // Tính endTime động dựa trên giờ hiện tại
  const calculateEndTime = () => {
    const now = new Date();
    let endDate = new Date(now);

    const currentHour = now.getHours();

    if (currentHour < 10) {
      // Trước 10h: Đếm đến 10h hôm nay
      endDate.setHours(10, 0, 0, 0);
    } else if (currentHour < 20) {
      // Trong giờ sale: Đếm đến 20h hôm nay
      endDate.setHours(20, 0, 0, 0);
    } else {
      // Sau 20h: Đếm đến 10h ngày mai
      endDate.setDate(now.getDate() + 1);
      endDate.setHours(10, 0, 0, 0);
    }

    return endDate.getTime();
  };

  const endTime = calculateEndTime();

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = endTime - now;

      if (distance < 0) {
        clearInterval(timer);
        setTimeLeft({ hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      setTimeLeft({
        hours: Math.floor(distance / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [endTime]);

  const formatTime = (num:number) => num.toString().padStart(2, '0');

  return (
    <div className="flex gap-2 bg-white text-black px-3 py-1 rounded-md font-semibold">
      <span>00</span>:
      <span>{formatTime(timeLeft.hours)}</span>:
      <span>{formatTime(timeLeft.minutes)}</span>:
      <span>{formatTime(timeLeft.seconds)}</span>
    </div>
  );
};

export default Countdown;