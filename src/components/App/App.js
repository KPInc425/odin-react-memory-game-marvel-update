import React, { useState } from "react";
import BestScore from "../BestScore/BestScore";
import PlayArea from "../PlayArea/PlayArea";
import Score from "../Score/Score";
import "./App.css";

import getMarvelResponse from "../../Utility/marvelApiClient";
import { useEffect } from "react";

function App() {
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [clickedCardArray, setClickedCardArray] = useState([]);
  const [memCardArray, setMemCardArray] = useState([]);

  useEffect(() => {
    const fetchCharacters = async () => {
      

      const results = await getMarvelResponse();

      const updatedMemCardArray = results
      .map((result) => ({
          img: `${result.thumbnail.path}.${result.thumbnail.extension}`,
          imgAlt: result.name,
          title: `Memba ${result.name}`,
        }));   

      setMemCardArray([...updatedMemCardArray]);
    };
    fetchCharacters();

  }, []);

  const handleCardClick = (clickedTitle) => {
    // console.log(clickedTitle);

    const alreadyClicked = clickedCardArray.find((title) => {
      // console.log(title);
      return title === clickedTitle;
    });

    if (alreadyClicked) {
      //Game Over
      if (score > bestScore) {
        setBestScore(score);
      }
      setScore(0);
      setClickedCardArray([]);
    } else {
      setClickedCardArray([...clickedCardArray, clickedTitle]);
      // Add to Score
      setScore(score + 1);
    }

    // console.log(clickedCardArray);
    randomizeCardArray();
  };

  const randomizeCardArray = () => {
    let tmpArray = [...memCardArray];
    tmpArray = shuffleArray(tmpArray);
    setMemCardArray(tmpArray);
  };

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  return (
    <div className="App">
      <h1>Memba Berries... ReMemba!</h1>
      <p>Memba the berry! Don't memba the same berry twice!</p>
      <div className="score">
        <Score score={score} />
        <BestScore bestScore={bestScore} />
      </div>
      <PlayArea cardsArray={memCardArray} handleCardClick={handleCardClick} />
    </div>
  );
}

export default App;
