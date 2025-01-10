"use client";

import React, { useEffect, useState } from "react";
import Confetti from "react-confetti";

const ResourcesFoundersDayPage = () => {
  const eventDate = new Date("2025-01-10T17:00:00Z"); // 9 AM PST in UTC
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  const [eventStarted, setEventStarted] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      const calculatedTime = calculateTimeLeft();
      setTimeLeft(calculatedTime);

      if (!calculatedTime) {
        setEventStarted(true); // Mark event as started
        setShowConfetti(true); // Trigger confetti animation
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

  useEffect(() => {
    if (showConfetti) {
      setTimeout(() => setShowConfetti(false), 5000); // Stop confetti after 5 seconds
    }
  }, [showConfetti]);

  return (
    <div className="min-h-screen text-navy-blue py-12 px-6 flex flex-col items-center">
      {showConfetti && (
        <Confetti
          width={window.innerWidth}
          height={window.innerHeight}
          colors={["#234c8b", "#6fa1f2", "#9cc4ff"]}
        />
      )}
      <h1 className="text-5xl font-bold text-center text-[#234c8b] mb-6">
        🎉 Countdown to Founder's Day! 🎉
      </h1>
      {timeLeft && !eventStarted ? (
        <div className="bg-white p-8 rounded-lg shadow-md text-center border border-blue-200">
          <h2 className="text-2xl font-semibold text-blue-700 mb-4">
            The celebration begins in:
          </h2>
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
        eventStarted && (
          <div className="mt-12 w-full max-w-3xl">
            <h2 className="text-3xl font-bold text-center text-[#234c8b] mb-6">
              Challenge: Preserving Chapter History
            </h2>
            <div className="bg-white p-6 rounded-lg shadow-md border border-blue-200">
              <p className="text-lg text-blue-700">
                Design a platform to organize and preserve the history of your
                chapter. Your solution should focus on creating a space where
                members can easily access and reflect on shared moments, whether
                through photos, event archives, or other creative methods.
              </p>
              <p className="text-lg mt-4 text-blue-900 font-semibold">
                Consider features that enhance usability or encourage engagement
                with chapter traditions!
              </p>
              <p className="text-md mt-4 text-gray-600">
                <strong>Submission:</strong> Only one submission per chapter is
                allowed. The deadline is January 29th, 11:59 PM EST.
              </p>
              <div className="mt-6">
                <p className="text-blue-700 italic">
                  Submission details are soon to be added.
                </p>
                <p className="text-blue-700 font-semibold mt-2">
                  Be on the lookout for announcements and updates on the Circle
                  platform throughout the competition!
                </p>
              </div>
            </div>
          </div>
        )
      )}
    </div>
  );
};

ResourcesFoundersDayPage.displayName = "ResourcesFoundersDayPage";
export default ResourcesFoundersDayPage;
