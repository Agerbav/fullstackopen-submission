const Notification = ({message}) => {
  if(message){
    return (
      <h1>{message}</h1>
    )
  }
  return (
    <div></div>
  )
}

export default Notification