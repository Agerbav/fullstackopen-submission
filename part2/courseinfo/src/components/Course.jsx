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

export default Course