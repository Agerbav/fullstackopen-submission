const Part = ({part}) => {
  return (
    <p>
        {part.name} {part.exercises}
    </p>
  )
}
const Header = ({course}) => {
  return (
    <h2>{course.name}</h2>
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

const Course = ({courses}) =>{
  return(
    <>
      <h1>Web Development Curriculum</h1>
      {courses.map(course => 
        <div key={course.id}>
          <Header course={course} />
          <Content course={course} />
          <Total course={course}/>
        </div>
      )}
    </>
  )
}

const App = () => {
    const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
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
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    },
    
  ]

  return <Course courses={courses} />
}

export default App