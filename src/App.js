import React, { useState, useEffect } from 'react';
import './App.css';
import { questionsData } from './data/questionsData';
import CategorySelector from './components/CategorySelector';
import QuestionCard from './components/QuestionCard';
import SearchBar from './components/SearchBar';

function App() {
  const [selectedCategory, setSelectedCategory] = useState('Core JS Concepts');
  const [searchTerm, setSearchTerm] = useState('');
  const categories = Object.keys(questionsData);

  // Filter questions based on search term
  const filteredQuestions = questionsData[selectedCategory]?.filter(item =>
    item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.answer.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  // Reset search when category changes
  useEffect(() => {
    setSearchTerm('');
  }, [selectedCategory]);

  return (
    <div className="App">
      <header className="app-header">
        <h1>🚀 JavaScript Interview Prep</h1>
        <p>Master JavaScript concepts for your technical interviews</p>
      </header>

      <main className="main-content">
        <div className="controls-section">
          <CategorySelector 
            categories={categories}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
          />
          
          <SearchBar onSearch={setSearchTerm} />
        </div>

        <div className="questions-section">
          <h2>{selectedCategory} {searchTerm && `(${filteredQuestions.length} results)`}</h2>
          
          {filteredQuestions.length === 0 && searchTerm ? (
            <div className="no-results">
              <p>No questions found for "{searchTerm}"</p>
            </div>
          ) : (
            <div className="questions-grid">
              {filteredQuestions.map(item => (
                <QuestionCard
                  key={item.id}
                  question={item.question}
                  answer={item.answer}
                  example={item.example}
                  explanation={item.explanation}
                />
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;