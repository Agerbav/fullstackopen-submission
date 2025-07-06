
const Part = (props) => {
  const part = props.part
  return (
    <p>
        {part.name} {part.exercises}
    </p>
  )
}

const Header = (props) => {
  const course = props.course
  return (
    <h1>{course}</h1>
  )
}
const Content = (props) => {
  const part1 = props.part1
  const part2 = props.part2
  const part3 = props.part3
  return (
    <div>
      <Part part={part1} />
      <Part part={part2} />
      <Part part={part3} />
    </div>
    )
}
const Total = (props) => {
  const part1 = props.part1
  const part2 = props.part2
  const part3 = props.part3
  return (
    <p>Number of exercises {part1.exercises + part2.exercises + part3.exercises}</p>
  )
}

const App = () => {
  const course = 'Half Stack application development'
  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10
  }
  const part2 = {
    name: 'Using props to pass data',
    exercises: 7
  }
  const part3 = {
    name: 'State of a component',
    exercises: 14
  }


  return (
    <div>
      <Header course={course} />
      <Content part1={part1} part2={part2} part3={part3} />
      <Total part1={part1} part2={part2} part3={part3}/>
    </div>
  )
}

export default App