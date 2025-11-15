import React, { useState } from 'react';

const QuestionCard = ({ question, answer, example, explanation }) => {
  const [showAnswer, setShowAnswer] = useState(false);
  const [showExample, setShowExample] = useState(false);

  return (
    <div className="question-card">
      <div className="question">
        <h3>{question}</h3>
      </div>
      
      <div className="actions">
        <button 
          onClick={() => setShowAnswer(!showAnswer)}
          className="btn-primary"
        >
          {showAnswer ? 'Hide Answer' : 'Show Answer'}
        </button>
        <button 
          onClick={() => setShowExample(!showExample)}
          className="btn-secondary"
        >
          {showExample ? 'Hide Example' : 'Show Example'}
        </button>
      </div>

      {showAnswer && (
        <div className="answer">
          <h4>Answer:</h4>
          <p>{answer}</p>
          <div className="explanation">
            <strong>Explanation:</strong> {explanation}
          </div>
        </div>
      )}

      {showExample && (
        <div className="example">
          <h4>Example:</h4>
          <pre><code>{example}</code></pre>
        </div>
      )}
    </div>
  );
};

export default QuestionCard;