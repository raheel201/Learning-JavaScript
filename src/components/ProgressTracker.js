import React from 'react';

const ProgressTracker = ({ totalQuestions, viewedQuestions }) => {
  const progress = totalQuestions > 0 ? (viewedQuestions.length / totalQuestions) * 100 : 0;

  return (
    <div className="progress-tracker">
      <h3>Your Progress</h3>
      <div className="progress-bar">
        <div 
          className="progress-fill" 
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      <p>{viewedQuestions.length} of {totalQuestions} questions viewed ({Math.round(progress)}%)</p>
    </div>
  );
};

export default ProgressTracker;