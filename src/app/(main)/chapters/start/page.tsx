import React from "react";

const ChapterStartPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-blue-100 to-white px-6 py-12">
      <div className="max-w-2xl text-center bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-4xl font-bold text-navy-blue mb-6">
          Start a Chapter
        </h1>
        <p className="text-lg text-gray-600 mb-6">
          If you're interested in starting a chapter of Kappa Theta Pi, click
          the button below to download our guide on how to begin.
        </p>
        <a
          href="/assets/Start-a-Chapter.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-gradient-to-r from-blue-500 to-blue-700 text-white font-semibold text-lg py-3 px-8 rounded-lg shadow-md hover:from-blue-600 hover:to-blue-800 hover:shadow-lg transition-transform transform hover:scale-105"
        >
          Download PDF
        </a>
      </div>
    </div>
  );
};

ChapterStartPage.displayName = "ChapterStartPage";
export default ChapterStartPage;
