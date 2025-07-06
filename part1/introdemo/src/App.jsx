
const Hello = (props) => {
  console.log(props)
  return (
    <div>
      <p>Hello {props.name}. You are {props.age}!</p>
    </div>
  )
}


const App = () => {

  // console.log("Hello from component")
  // return(
  //   <div>
  //     <p>Hello World</p>
  //   </div>
  // )

  // const now = new Date()
  // const a = 10
  // const b = 20

  // console.log(now, a+b)

  // const name = "Suzy";
  // const age = 6;

  // const friends = [
  //   {name: "Peter", age: 4},
  //   {name: "Jack", age: 10},
  // ]
  // const friends = ["Peter", "Maya"]

  //OBJECTS ARE NOT VALID AS REACT CHILD
  // return(
  //   <>
  //     <p>{friends[0]}</p>
  //   </>
  // )
}

export default App