import './App.css'
import StartScreen from './components/StartScreen'
import Game from './components/Game'
import gameOver from './components/GameOver'
import { useCallback, useEffect, useState } from 'react'
import {wordsList} from './data/words'


const stages = [
  {id: 1, name: "start"},
  {id: 2, name: "game"},
  {id: 3, name: "end"},
];

function App() {
  const [count, setCount] = useState(0)
  const [gameStage, setGameState] = useState (stages[0].name);
  const [words] = useState(wordsList)

  console.log(words)

  return (
    <>
    <div className="App">
      {gameStage === 'start' && <StartScreen />}
      {gameStage === 'game' && <game />}
      {gameStage === 'end' && <gameOver />}
    </div>
    </>
  )
}

export default App
