import React from "react"
import './App.css';
import Die from "./Die.js"
import {nanoid} from "nanoid"
import Confetti from "react-confetti"

function App(){
    
  const [dice, setDice] = React.useState(allNewDice())
  const [tenzies, setTenzies] = React.useState(false)

  
  
  React.useEffect(() => {
      const allHeld = dice.every(die => die.isHeld)
      const firstVal = dice[0].value
      const allSameVal = dice.every(die => die.value === firstVal)
      
      if(allHeld && allSameVal){
          setTenzies(true)
          console.log("you won")
      }
  },[dice])
  
  function generateDie(){
      return {
          value: Math.ceil(Math.random() * 6),
          id: nanoid(),
          isHeld: false
      }
  }
  
  function allNewDice(){
      const newDice = []
      for(let i = 0; i < 10; i++){
          newDice.push(generateDie())
      }
      return newDice
  }
  
  function holdDie(id){
      // console.log(id)
      setDice(prevState => {
          return prevState.map(die => die.id === id ? {...die, isHeld: !die.isHeld} : die)
      })
  }
  
  // console.log(dice)
  
  const diceEl = dice.map((die, index) => <Die holdDie={holdDie} id={die.id} isHeld={die.isHeld} key={die.id} value={die.value}/>)
  
  function rollDice(){
      !tenzies ? 
      setDice(prevState => {
         return prevState.map(die => {
              return die.isHeld ? die : generateDie()
          })
      }) :
      setDice(allNewDice())
      setTenzies(false)
  }
  
  
  
  return (
      
      <div className="main">
        {tenzies && <Confetti />}
          <h1 className="title"> Tenzies </h1>
          <p className="instructions"> Roll until all dice have the same value. Click each die to freeze it at its current value between rolls </p>
          <div className="dice-container">
          
              {diceEl}
          </div>
          <button className="roll-btn" onClick={rollDice}> 
          {tenzies ? "New Game" : "Roll"} 
          </button>
      </div>
      
  )
}

export default App
