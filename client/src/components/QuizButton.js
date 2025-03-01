import React, { useState } from 'react';
import { Button } from 'react-bootstrap';

function QuizButton() {
  const [answerStatus, setAnswerStatus] = useState(null);

  const handleClick = (isCorrect) => {
    setAnswerStatus(isCorrect ? 'success' : 'danger');
    setTimeout(() => setAnswerStatus(null), 1000); // איפוס הצבע אחרי 1 שנייה
  };

  return (
    <div>
      <Button
        variant={answerStatus || 'primary'}
        onClick={() => handleClick(true)} // להעביר false אם זה לא נכון
      >
        תשובה 1
      </Button>
    </div>
  );
}

export default QuizButton;
