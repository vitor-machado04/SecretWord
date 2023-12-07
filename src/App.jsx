import './App.css'
import StartScreen from './components/StartScreen'
import Game from './components/Game'
import GameOver from './components/GameOver'
import { useCallback, useEffect, useState } from 'react'
import { wordsList } from './data/words'


const stages = [
  { id: 1, name: "start" },
  { id: 2, name: "game" },
  { id: 3, name: "end" },
];

function App() {
  const [count, setCount] = useState(0);
  const [gameStage, setGameStage] = useState(stages[0].name);
  const [words] = useState(wordsList);

  const [pickedWord, setPickedWord] = useState("")
  const [pickedCategory, setpickedCategory] = useState("")
  const [letters, setLetters] = useState([]);

  const pickedWordAndCategory = () => {
    // pegando uma categoria aleatória
    const categories = Object.keys(words)
    const category =
      categories[Math.floor(Math.random() * Object.keys(categories).length)];
    console.log(category)

    // pegando uma palavra aleatória
    const word = words[category][Math.floor(Math.random() * words[category].length)]
    console.log(word)

    return { word, category }
  }

  // inicializar o jogo de palavras
  const startGame = () => {
    // selecionar palavra e selecionar categoria
    const { word, category } = pickedWordAndCategory();

    // criando array de letras
    let wordLetters = word.split("")

    wordLetters = wordLetters.map((l) => l.toLowerCase());

    console.log(word, category)
    console.log(wordLetters)

    // Setando os estados
    setPickedWord(word);
    setpickedCategory(category);
    setLetters(letters);

    setGameStage(stages[1].name);
  };

  // processo do input de letras
  const verifyLetter = () => {
    setGameStage(stages[2].name);
  };

  // restart do jogo
  const retry = () => {
    setGameStage(stages[0].name);
  };

  return (
    <>
      <div className="App">
        {gameStage === 'start' && <StartScreen startGame={startGame} />}
        {gameStage === 'game' && <Game verifyLetter={verifyLetter} />}
        {gameStage === 'end' && <GameOver retry={retry} />}

      </div>
    </>
  )
}

export default App
