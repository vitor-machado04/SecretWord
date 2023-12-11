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

  const [guessedLetters, setGuessedLetters] = useState([])
  const [wrongLetters, setWrongLetters] = useState([])
  const [guesses, setGuesses] = useState(3)
  const [score, setScore] = useState(0)

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
    setLetters(wordLetters);

    setGameStage(stages[1].name);
  };

  // processo do input de letras
  const verifyLetter = (letter) => {

    const normalizedLetter = letter.toLowerCase()

    // checando se a letra já foi utilizada
    if (guessedLetters.includes(normalizedLetter) || wrongLetters.includes(normalizedLetter)) {
      return;
    }

    // removendo chance de jogo caso letra errada
    if (letters.includes(normalizedLetter)) {
      setGuessedLetters((actualGuessedLetters) => [
        ...actualGuessedLetters,
        normalizedLetter
      ]);
    } else {
      setWrongLetters((actualWrongLetters) => [
        ...actualWrongLetters,
        normalizedLetter
      ]);

      setGuesses((actualGuesses) => actualGuesses - 1);
    }
  };

  // monitoramento das tentativas do jogo
  const clearLetterStates = () => {
    setGuessedLetters([])
    setWrongLetters([])
  }

  useEffect(() => {
    if (guesses <= 0) {
      // resetar todos os estados para poder reiniciar o jogo zerado 
      clearLetterStates()

      setGameStage(stages[2].name);
    }
  }, [guesses])

  // restart do jogo
  const retry = () => {
    setScore(0);
    setGuesses(3);
    
    setGameStage(stages[0].name);
  };

  return (
    <>
      <div className="App">
        {gameStage === 'start' && <StartScreen startGame={startGame} />}
        {gameStage === 'game' && <Game verifyLetter={verifyLetter} pickedWord={pickedWord} pickedCategory={pickedCategory} letters={letters} guessedLetters={guessedLetters} wrongLetters={wrongLetters} guesses={guesses} score={score} />}
        {gameStage === 'end' && <GameOver retry={retry} score={score} />}

      </div>
    </>
  )
}

export default App
