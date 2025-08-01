
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
    <h1>{course.name}</h1>
  )
}
const Content = (props) => {
  const course = props.course
  return (
    <div>
      <Part part={course.parts[0]} />
      <Part part={course.parts[1]} />
      <Part part={course.parts[2]} />
    </div>
    )
}
const Total = (props) => {
  const course = props.course
  return (
    <p>Number of exercises {course.parts[0].exercises + course.parts[1].exercises + course.parts[2].exercises}</p>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }


  return (
    <div>
      <Header course={course} />
      <Content course={course} />
      <Total course={course}/>
    </div>
  )
}

export default App