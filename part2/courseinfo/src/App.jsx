const Part = ({part}) => {
  return (
    <p>
        {part.name} {part.exercises}
    </p>
  )
}
const Header = ({course}) => {
  return (
    <h1>{course.name}</h1>
  )
}
const Content = ({course}) => {
  return (
    <>
      {course.parts.map(part => 
        <Part key={part.id} part={part} />
      )}
    </>
  )
}
const Total = ({course}) => {
  const exercises = course.parts.map(part => part.exercises)
  return(
    <p>Total of {exercises.reduce((total, currentValue)=>total + currentValue)} Exercises</p>
  )
}

const Course = ({course}) =>{
  return(
    <div>
      <Header course={course} />
      <Content course={course} />
      <Total course={course}/>
    </div>
  )
}

const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      },
    ]
  }

  return <Course course={course} />
}

export default App