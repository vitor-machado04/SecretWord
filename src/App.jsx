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

  const pickedWordAndCategory = useCallback(() => {
    // pegando uma categoria aleatória
    const categories = Object.keys(words)
    const category =
      categories[Math.floor(Math.random() * Object.keys(categories).length)];

    // pegando uma palavra aleatória
    const word = words[category][Math.floor(Math.random() * words[category].length)]

    return { word, category }
  },[words]);

  // inicializar o jogo de palavras
  const startGame = useCallback(() => {
    // limpando todas as letras
    clearLetterStates();

    // selecionar palavra e selecionar categoria
    const { word, category } = pickedWordAndCategory();

    // criando array de letras
    let wordLetters = word.split("")

    wordLetters = wordLetters.map((l) => l.toLowerCase());

    // Setando os estados
    setPickedWord(word);
    setpickedCategory(category);
    setLetters(wordLetters);

    setGameStage(stages[1].name);
  }, [pickedWordAndCategory]);

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


  // monitorando se as chances terminaram 
  useEffect(() => {
    if (guesses <= 0) {
      // resetar todos os estados para poder reiniciar o jogo zerado 
      clearLetterStates()

      setGameStage(stages[2].name);
    }
  }, [guesses]);

  // monitoriando condição de vitória
  useEffect(() => {

    const uniqueLetters = [... new Set(letters)]

    // condição de vitória
    if (guessedLetters.length === uniqueLetters.length) {
      // adicionando pontuação
      setScore((actualScore) => actualScore += 100)

      // Restartando jogo com uma nova palavra
      startGame();
    }
  }, [guessedLetters, letters, startGame])

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
