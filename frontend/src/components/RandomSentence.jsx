import React, { useState } from "react";
import { useSpeechSynthesis } from "react-speech-kit";
import { useNavigate } from "react-router-dom";
import "./dashboard.css";

export const RandomSentence = () => {
  const { speak, voices } = useSpeechSynthesis({});
  const [randomSentence, setRandomSentence] = useState("");
  const [text, setText] = useState(" ");
  const [result, setResult] = useState("");
  const navigate = useNavigate();
  const generateRandomSentence = () => {
    fetch("https://type.fit/api/quotes")
      .then((response) => response.json())
      .then((data) => {
        const randomIndex = Math.floor(Math.random() * data.length);
        const randomSentence = data[randomIndex].text;
        setRandomSentence(randomSentence);
      })
      .catch((error) => console.error(error));
  };

  const speakRandomSentence = () => {
    speak({
      text: randomSentence
        ? randomSentence
        : "Click on Generate New Random Sentence and then click on Speak",
      voice: voices[2],
    });
  };

  const checkSentence = () => {
    if (text.trim() === randomSentence.trim()) {
      setResult("Correct sentence!");
    } else {
      const hi = "Correct sentence is: " + randomSentence + "";
      setResult(hi);
    }
  };

  return (
    <div id="div3">
      <div className="container" id="container3">
        <h3>
          First click on "Generate Random Sentence" and then click on "Speak" to
          hear the sentence. Try to type the sentence in the textarea and click
          "Check Sentence" to verify your answer.
        </h3>
        <button onClick={speakRandomSentence}>Speak Random Sentence</button>
        <button onClick={generateRandomSentence}>
          Generate New Random Sentence
        </button>
        <br />
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Write the sentence..."
        />
        <br />
        <button onClick={checkSentence}>
          Check Sentence or See Correct Sentence
        </button>
        <h2>{result}</h2>
        <button
          className="buttonStyle"
          onClick={() => navigate("/dashboard")} 
        >
          Back
        </button>
      </div>
    </div>
  );
};
