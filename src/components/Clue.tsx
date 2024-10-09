import React, { useState } from 'react';
import styled from 'styled-components';
// if cloudflare dev mode, use localhost, else use prod
// @ts-ignore
const e = "dev";
const WORKER_URL = e === "dev" ? 'http://localhost:8787' : 'https://math-clues-worker.codeanand.workers.dev';

const getCluesFromClaude = async (question: string): Promise<string[]> => {
  try {
    const response = await fetch(`${WORKER_URL}/api/get-clues`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ question }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.clues;
  } catch (error) {
    console.error('Error fetching clues:', error);
    return [];
  }
};

const Clue: React.FC = () => {
  const [question, setQuestion] = useState('');
  const [clues, setClues] = useState<string[]>([]);
  const [currentClueIndex, setCurrentClueIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setClues([]);
    setCurrentClueIndex(0);
    try {
      const newClues = await getCluesFromClaude(question);
      setClues(newClues);
    } catch (err) {
      setError('Failed to fetch clues. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleNextClue = () => {
    if (currentClueIndex < clues.length - 1) {
      setCurrentClueIndex(currentClueIndex + 1);
    }
  };

  const handlePreviousClue = () => {
    if (currentClueIndex > 0) {
      setCurrentClueIndex(currentClueIndex - 1);
    }
  };

  return (
    <ClueContainer>
      <Title>Math Clues</Title>
      <form onSubmit={handleSubmit}>
        <QuestionInput
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Enter your math question here"
        />
        <SubmitButton type="submit" disabled={loading}>
          {loading ? 'Clues take 50 seconds' : 'Get Clues'}
        </SubmitButton>
      </form>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      {clues.length > 0 && (
        <ClueBox>
          <ClueTitle>Clue {currentClueIndex + 1}</ClueTitle>
          <div dangerouslySetInnerHTML={{ __html: clues[currentClueIndex] }} />
          <ButtonContainer>
            {currentClueIndex > 0 && (
              <NavigationButton onClick={handlePreviousClue}>
                Previous Clue
              </NavigationButton>
            )}
            {currentClueIndex < clues.length - 1 && (
              <NavigationButton onClick={handleNextClue}>
                Next Clue
              </NavigationButton>
            )}
          </ButtonContainer>
        </ClueBox>
      )}
    </ClueContainer>
  );
};

export default Clue;

const ClueContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 40px;
  background-color: #f0f8ff; // Light blue background
  border-radius: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  font-family: 'Comic Sans MS', cursive, sans-serif; // Kid-friendly font
`;

const Title = styled.h1`
  font-size: 2.5rem;
  color: #4a4a4a;
  margin-bottom: 30px;
  text-align: center;
`;

const QuestionInput = styled.textarea`
  width: 100%;
  height: 100px;
  padding: 15px;
  font-size: 1.2rem;
  border: 2px solid #7cb9e8;
  border-radius: 10px;
  margin-bottom: 20px;
  resize: vertical;
`;

const SubmitButton = styled.button`
  display: block;
  width: 100%;
  padding: 15px;
  font-size: 1.3rem;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #45a049;
  }

  &:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }
`;

const ClueBox = styled.div`
  background-color: white;
  border: 2px solid #7cb9e8;
  border-radius: 15px;
  padding: 20px;
  margin-top: 30px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const ClueTitle = styled.h3`
  font-size: 1.8rem;
  color: #4a4a4a;
  margin-bottom: 15px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
`;

const NavigationButton = styled.button`
  padding: 10px;
  font-size: 1.2rem;
  background-color: #7cb9e8;
  color: white;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #5a9bd4;
  }
`;

const ErrorMessage = styled.div`
  color: #d32f2f;
  font-size: 1.2rem;
  margin-top: 20px;
  text-align: center;
  background-color: #ffcdd2;
  padding: 10px;
  border-radius: 5px;
`;