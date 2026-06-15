import React, { useState } from 'react';
import './StoryQuest.css';

const QUEST_STEPS = [
  {
    question: "When did Dinusha & Chamini first meet?",
    options: ["December 25, 2022", "January 8, 2023", "August 11, 2030"],
    correct: 0,
    hint: "It was a magical Christmas Eve party."
  },
  {
    question: "Where did they go for their first date?",
    options: ["A beach side cafe", "A rooftop jazz bar", "A botanical garden walk"],
    correct: 1,
    hint: "They talked until closing time under rooftop city lights."
  },
  {
    question: "When did Dinusha propose to Chamini?",
    options: ["June 21, 2025", "December 25, 2015", "August 11, 2030"],
    correct: 0,
    hint: "A balmy summer evening with sunset shades of amber and rose."
  }
];

export default function StoryQuest({ onUnlock }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showError, setShowError] = useState(false);
  const [completed, setCompleted] = useState(false);

  const handleSelect = (idx) => {
    setSelectedOption(idx);
    setShowError(false);
  };

  const handleNext = () => {
    if (selectedOption === null) return;

    if (selectedOption === QUEST_STEPS[currentStep].correct) {
      if (currentStep < QUEST_STEPS.length - 1) {
        setCurrentStep(currentStep + 1);
        setSelectedOption(null);
      } else {
        setCompleted(true);
        setTimeout(() => {
          onUnlock();
        }, 1500);
      }
    } else {
      setShowError(true);
    }
  };

  return (
    <div className="quest-overlay">
      <div className="quest-box">
        {!completed ? (
          <>
            <div className="quest-header">
              <span className="quest-icon-main">🗝️</span>
              <h2>Unlock the Celebration</h2>
              <p className="quest-subtitle">
                Solve the love story quiz of Dinusha &amp; Chamini to enter their wedding invitation details!
              </p>
              <div className="quest-progress">
                <span className="progress-text">Milestone {currentStep + 1} of {QUEST_STEPS.length}</span>
                <div className="progress-bar-container">
                  <div 
                    className="progress-bar-fill" 
                    style={{ width: `${((currentStep + 1) / QUEST_STEPS.length) * 100}%` }}
                  />
                </div>
              </div>
            </div>

            <div className="quest-body">
              <h3 className="quest-question">{QUEST_STEPS[currentStep].question}</h3>
              <div className="quest-options">
                {QUEST_STEPS[currentStep].options.map((opt, idx) => (
                  <button
                    key={idx}
                    className={`quest-option-btn ${selectedOption === idx ? 'selected' : ''}`}
                    onClick={() => handleSelect(idx)}
                  >
                    {opt}
                  </button>
                ))}
              </div>
              
              {showError && (
                <div className="quest-error-msg">
                  ⚠️ That's not correct! Hint: {QUEST_STEPS[currentStep].hint}
                </div>
              )}
            </div>

            <div className="quest-footer">
              <button 
                className="quest-next-btn"
                disabled={selectedOption === null}
                onClick={handleNext}
              >
                {currentStep === QUEST_STEPS.length - 1 ? 'Unlock Invitation 🔓' : 'Next Question ➜'}
              </button>
            </div>
          </>
        ) : (
          <div className="quest-success-screen">
            <span className="success-unlock-icon">🔓</span>
            <h2>Access Granted!</h2>
            <p>You have unlocked the celebration dashboard. Preparing the invitation...</p>
          </div>
        )}
      </div>
    </div>
  );
}
