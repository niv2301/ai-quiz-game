import React, { useState } from 'react';
import axios from 'axios';
import { Container, Button, Card, Row, Col, Stack } from 'react-bootstrap';
import { motion } from 'framer-motion'; // For cool animations
import './App.css';

function App() {
  const [isQuizStarted, setIsQuizStarted] = useState(false); // Start quiz after category/difficulty selection
  const [category, setCategory] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [question, setQuestion] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [correctAnswer, setCorrectAnswer] = useState(null);
  const [score, setScore] = useState(0);

  // Shuffle answers randomly
  const shuffleArray = (array) => array.sort(() => Math.random() - 0.5);

  const fetchQuestion = async () => {
    try {
      const response = await axios.post('http://localhost:3000/generate-question', {
        category,
        difficulty,
      });

      const data = response.data;
      setQuestion(data.question);
      setAnswers(shuffleArray([...data.answers]));
      setCorrectAnswer(data.correct);
      setSelectedAnswer(null);
    } catch (error) {
      console.error('Error fetching question:', error);
    }
  };

  const handleStartQuiz = () => {
    if (category && difficulty) {
      setIsQuizStarted(true);
      fetchQuestion();
    } else {
      alert('Please select both a category and difficulty level.');
    }
  };

  const handleAnswerClick = (answer) => {
    if (selectedAnswer) return; // Prevent multiple clicks
    setSelectedAnswer(answer);

    if (answer === correctAnswer) {
      setScore((prev) => prev + (difficulty === 'Easy' ? 5 : difficulty === 'Medium' ? 10 : 20)); // Dynamic scoring
    }
  };

  return (
    <div className="App">
      <Container className="quiz-container text-center">
        {!isQuizStarted ? (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="title">Welcome to the AI Quiz Game</h1>
            <h3 className="subtitle">Choose Your Category and Difficulty</h3>

            <div className="selection-buttons">
              <Stack gap={2}>
                <h4 className="selection-label">Category</h4>
                {['General', 'Science', 'Math', 'History', 'Sports'].map((cat) => (
                  <motion.div key={cat} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                    <Button
                      variant={category === cat ? 'success' : 'primary'}
                      onClick={() => setCategory(cat)}
                      className="category-button"
                    >
                      {cat}
                    </Button>
                  </motion.div>
                ))}
              </Stack>

              <Stack gap={2} className="mt-4">
                <h4 className="selection-label mt-3">Difficulty</h4>
                {['Easy', 'Medium', 'Hard'].map((diff) => (
                  <motion.div key={diff} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                    <Button
                      variant={difficulty === diff ? 'success' : 'secondary'}
                      onClick={() => setDifficulty(diff)}
                      className="difficulty-button"
                    >
                      {diff}
                    </Button>
                  </motion.div>
                ))}
              </Stack>
            </div>

            <Button onClick={handleStartQuiz} variant="warning" className="start-button mt-5">
              Start Quiz
            </Button>
          </motion.div>
        ) : (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="question-area">
              <Card className="question-card">
                <Card.Body>
                  <Card.Title>{question}</Card.Title>
                </Card.Body>
              </Card>
            </motion.div>

            <Row className="answers-grid mt-4">
              {answers.map((answer, index) => (
                <Col xs={6} key={index}>
                  <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                    <Button
                      variant={
                        selectedAnswer
                          ? answer === correctAnswer
                            ? 'success'
                            : answer === selectedAnswer
                            ? 'danger'
                            : 'outline-secondary'
                          : 'info'
                      }
                      className="answer-button"
                      onClick={() => handleAnswerClick(answer)}
                    >
                      {answer}
                    </Button>
                  </motion.div>
                </Col>
              ))}
            </Row>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="score"
            >
              <h3>Your Score: {score}</h3>
              <Button onClick={fetchQuestion} variant="dark" className="next-question-button">
                Next Question
              </Button>
            </motion.div>
          </>
        )}
      </Container>
    </div>
  );
}

export default App;
