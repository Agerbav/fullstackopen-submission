import { useState } from 'react'

const Statistics = ({good, neutral, bad, total, average, positive}) => {
  if(total === 0){
    return(
      <p>No Feedback has been given</p>
    )
  }
  return (
    <div>
      <Display text="good" total={good}/>
      <Display text="neutral" total={neutral}/>
      <Display text="bad" total={bad}/>
      <Display text="all" total={total}/>
      <Display text="average" total={average}/>
      <Display text="positive" total={positive}/>
    </div>
  )
 
  
}


const Display = ({text, total}) => {
  return (
    <div>
      <p>{text} {total}</p>
    </div>
  )
}

const Button = ({text, onClick}) => {
  return (
    <button onClick={onClick}>
      {text}
    </button>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [total, setTotal] = useState(0)


  const increaseGood = () => {
    const prevGood = good + 1;
    setTotal(prevGood + bad + neutral)
    setGood(good + 1)
  } 
  const increaseNeutral = () => {
    const prevNeutral = neutral + 1;
    setTotal(good + bad + prevNeutral)
    setNeutral(neutral + 1)
  }
  const increaseBad = () => {
    const prevBad = bad + 1;
    setTotal(good + prevBad + neutral)
    setBad(bad + 1)
  }
  const calculateAverage = () => {
    return (good - bad) / total
  }
  const calculatePositive = () => {
    return (good / total)*100 + "%"
  }

  return (
    <div>
      <h1>Give Feedback</h1>
      <p>
        <Button text="good" onClick={increaseGood}/>
        <Button text="neutral" onClick={increaseNeutral}/>
        <Button text="bad" onClick={increaseBad}/>
      </p>
      

      <h1>Statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} total={total} average={calculateAverage()} positive={calculatePositive()}/>
    </div>
  )
}

export default App