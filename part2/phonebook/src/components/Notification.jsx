const Notification = ({ message, status }) => {
  const messageSuccess = {
      color: 'green',
      background: 'lightgrey',
      fontSize: '20px',
      borderStyle: 'solid',
      borderRadius: '5px',
      padding: '10px',
      marginBottom: '10px'
    }
  const messageError = {
      color: 'red',
      background: 'lightgrey',
      fontSize: '20px',
      borderStyle: 'solid',
      borderRadius: '5px',
      padding: '10px',
      marginBottom: '10px'
    }
  if (message === null) {
    return null
  }
  else if (status === 0){
    return (
      <div style={messageError}>
        {message}
      </div>
    )
  }
  else {
    return (
      <div style={messageSuccess}>
        {message}
      </div>
    )
  }
  
}

export default Notification