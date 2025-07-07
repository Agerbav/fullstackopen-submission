
import { useState } from "react"

// const Hello = ( {name, age}) => {
//   const bornYear = () => new Date().getFullYear() - age
//   return ( 
//     <div>
//       <p>Hello {name}. You are {age}!</p>
//       <p>So you were probaly born in {bornYear()}</p>
//     </div>
//   )
// }

const History = (props) => {
  if(props.allClicks.length === 0){
    return (
      <div>The app is used by pressing the buttons</div>
    )
  }
  return (
    <div>Button press history: {props.allClicks.join(' ')}</div>
  )
}

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>


const App = () => {
  const [left, setLeft] = useState(0)
  const [right, setRight] = useState(0)
  const [allClicks, setAll] = useState([])
  // const [total, setTotal] = useState(0)

  const handleLeftClick = () => {
    setAll(allClicks.concat('L'))
    // const updatedLeft = left+1
    setLeft(left + 1)
    // setTotal(updatedLeft+right)
  }


  const handleRightClick = () => {
    setAll(allClicks.concat('R'))
    // const updatedRight = right+1
    setRight(right + 1)
    // setTotal(left+updatedRight)
  }

  return (
    <div>
      {left}
      <Button onClick={handleLeftClick} text='left' />
      <Button onClick={handleRightClick} text='right' />
      {right}

      
      <History allClicks={allClicks}/>
    </div>
  )
}

export default App