import React from "react";

const ChapterStartPage = () => {
  return (
    <div className="start-chapter-page">
      <h1>Start a Chapter</h1>
      <p>
        If you're interested in starting a chapter of Kappa Theta Pi, click the
        button below to download our guide on how to begin.
      </p>
      <a
        href="/assets/Start-a-Chapter.pdf"
        target="_blank"
        rel="noopener noreferrer"
        className="btn"
      >
        Download PDF
      </a>
    </div>
  );
};

ChapterStartPage.displayName = "ChapterStartPage";
export default ChapterStartPage;
