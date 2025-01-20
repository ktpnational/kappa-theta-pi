'use client';

import { memo, useEffect, useState } from 'react';

const FoundersDay: React.FC = memo((): React.JSX.Element => {
  const eventDate = new Date('2025-01-10T17:00:00Z'); // 9 AM PST in UTC
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  const [eventStarted, setEventStarted] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      const calculatedTime = calculateTimeLeft();
      setTimeLeft(calculatedTime);

      if (!calculatedTime) {
        setEventStarted(true); // Mark event as started
        clearInterval(timer); // Stop the timer
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  function calculateTimeLeft() {
    const now = new Date();
    const difference = eventDate.getTime() - now.getTime();

    if (difference <= 0) {
      return null; // Event has started
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  }
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-white py-12 px-6 flex flex-col items-center">
      <h1 className="text-5xl font-bold text-center text-white mb-6">
        🎉 Countdown to Founders Day! 🎉
      </h1>
      {timeLeft ? (
        <div className="bg-blue-100 p-8 rounded-lg shadow-md text-center">
          <h2 className="text-2xl font-semibold text-blue-700 mb-4">The celebration begins in:</h2>
          <div className="flex justify-center gap-4 text-4xl font-bold text-blue-900">
            <div>
              <span>{timeLeft.days}</span>
              <p className="text-sm font-medium text-blue-600">Days</p>
            </div>
            <div>
              <span>{timeLeft.hours}</span>
              <p className="text-sm font-medium text-blue-600">Hours</p>
            </div>
            <div>
              <span>{timeLeft.minutes}</span>
              <p className="text-sm font-medium text-blue-600">Minutes</p>
            </div>
            <div>
              <span>{timeLeft.seconds}</span>
              <p className="text-sm font-medium text-blue-600">Seconds</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-blue-100 p-8 rounded-lg shadow-md text-center">
          <h2 className="text-2xl font-semibold text-green-700 mb-4">
            The celebration has started! 🎉
          </h2>
          <p className="text-blue-700">
            Join us as we celebrate the day Kappa Theta Pi was founded and honor our legacy!
          </p>
        </div>
      )}

      {eventStarted && (
        <div className="mt-12 w-full max-w-3xl">
          <h2 className="text-3xl font-bold text-center text-white mb-6">
            🎈 Founders Day Prompt 🎈
          </h2>
          <div className="bg-blue-100 p-6 rounded-lg shadow-md">
            <p className="text-lg text-blue-700">
              Founders Day is a celebration of the day Kappa Theta Pi was founded, reflecting on our
              legacy and achievements.
            </p>
            <p className="text-lg mt-4 text-blue-900 font-semibold">Here’s today’s prompt:</p>
            <blockquote className="border-l-4 border-blue-500 pl-4 mt-2 text-blue-800 italic">
              "What does Founders Day mean to you? Share your thoughts and stories!"
            </blockquote>
          </div>
        </div>
      )}
    </div>
  );
});

FoundersDay.displayName = 'FoundersDay';
export { FoundersDay };
