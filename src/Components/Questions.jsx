import React from 'react';

const Question = ({ question, options, selectedOption, handleOptionChange }) => {
  return (
    <div className="question">
      <h3>{question}</h3>
      {options.map((option, index) => (
        <div key={index}>
          <label>
            <input
              type="radio"
              name={question}
              value={option}
              checked={selectedOption === option}
              onChange={() => handleOptionChange(option)}
            />
            {option}
          </label>
        </div>
      ))}
    </div>
  );
};

export default Question;


