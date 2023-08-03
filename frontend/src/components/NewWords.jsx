import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import './NewWord.css';
export const ButtonGrid = () => {
  // const navigate = useNavigate();
  const navigate = useNavigate();
  const [words, setWords] = useState([]);
  const [selectedWord, setSelectedWord] = useState("");

  useEffect(() => {
    fetchRandomWords();
  }, []);

  const fetchRandomWords = async () => {
    try {
      const response = await fetch(
        "https://random-word-api.herokuapp.com/word?number=16"
      );

      if (response.ok) {
        const data = await response.json();
        setWords(data);
      } else {
        console.log("Failed to fetch random words.");
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const handleClick = (word) => {
    setSelectedWord(word);
    speakWord(word);
  };

  const speakWord = (word) => {
    if ("speechSynthesis" in window) {
      const speech = new SpeechSynthesisUtterance(word);
      window.speechSynthesis.speak(speech);
    } else {
      console.log("Text-to-speech not supported in this browser.");
    }
  };

  const renderButtons = () => {
    return words.map((word, index) => (
      <button key={index} onClick={() => handleClick(word)}>
        {word}
      </button>
    ));
  };

  const handleWordChange = () => {
    setSelectedWord("");
    fetchRandomWords();
  };

  return (
    <div className="button-grid">
      <div>
        {words.length > 0 ? (
          renderButtons()
        ) : (
          <p>Loading words...</p>
        )}
      </div>
      <div>
        {selectedWord && <p>Selected word: {selectedWord}</p>}
        <button onClick={handleWordChange}>Change Words</button>

      </div>
      <button className="buttonStyle" onClick={() => navigate("/dashboard")}>Back</button>

    </div>
  );
};

export default ButtonGrid;
