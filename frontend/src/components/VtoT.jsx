import React, { useState, useEffect } from "react";
import { useSpeechSynthesis } from "react-speech-kit";
import { useNavigate } from "react-router-dom";
import "./VtoT.css";
import "./dashboard.css";

const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;
const mic = new SpeechRecognition();

mic.continuous = true;
mic.interimResults = true;
mic.lang = "en-US";

export const VtoT = () => {
  const [isListening, setIsListening] = useState(false);
  const [note, setNote] = useState(null);
  const [data, setData] = useState(null);
  const { speak, voices } = useSpeechSynthesis({});
  const navigate = useNavigate(); // Use useNavigate instead of useHistory

  useEffect(() => {
    fetchNewWord();
  }, []);

  useEffect(() => {
    handleListen();
  }, [isListening]);

  const fetchNewWord = () => {
    fetch("https://random-word-api.herokuapp.com/word?length=5")
      .then((response) => response.json())
      .then((json) => setData(json[0]))
      .catch((error) => console.error(error));
  };

  const handleListen = () => {
    if (isListening) {
      mic.start();
      mic.onend = () => {
        console.log("continue..");
        mic.start();
      };
    } else {
      mic.stop();
      mic.onend = () => {
        console.log("Stopped Mic on Click");
      };
    }
    mic.onstart = () => {
      console.log("Mics on");
    };

    mic.onresult = (event) => {
      const transcript = Array.from(event.results)
        .map((result) => result[0])
        .map((result) => result.transcript)
        .join("");
      console.log(transcript);
      setNote(transcript);
      mic.onerror = (event) => {
        console.log(event.error);
      };
    };
  };

  const checkAnswer = () => {
    if (note === data) {
      return <h2>Correct</h2>;
    } else {
      return <h2>Not Correct</h2>;
    }
  };

  const speakRandomWord = () => {
    speak({ text: data, voice: voices[3] });
  };

  const handleNextWord = () => {
    fetchNewWord();
    setNote("");
  };

  return (
    <>
      <div className="container" id="container2">
        <h3>Click BUTTON AND START SPEAKING GIVEN WORD</h3>
        <div className="container4">
          <div className={`box animated ${isListening ? "scaleIn" : "fadeIn"}`}>
            <h2>{note}</h2>
            {isListening ? <span>🎙️</span> : <span>🛑🎙️</span>}
            <button onClick={() => setIsListening((prevState) => !prevState)}>
              Start/Stop
            </button>
            <button onClick={() => speak({ text: note, voice: voices[2] })}>
              Start Listening
            </button>
          </div>
          <div className={`box animated ${isListening ? "scaleIn" : "fadeIn"}`}>
            <button className="buttonStyle" onClick={speakRandomWord}>
              Start
            </button>
            <button className="buttonStyle" onClick={handleNextWord}>
              Next
            </button>
            {data ? <h2>{data}</h2> : "Loading..."}
            {note && checkAnswer()}
          </div>
          <button
            className="buttonStyle"
            onClick={() => navigate("/dashboard")} // Use navigate directly
          >
            Back
          </button>
        </div>
      </div>
    </>
  );
};
