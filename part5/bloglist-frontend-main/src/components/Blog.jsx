import { useState } from 'react'
const Blog = ({ blog, handleAddLike, handleRemoveBlog, user }) => {
  const [detailsShown, setDetailsShown] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const addLike = () => {
    handleAddLike({ ...blog, likes: blog.likes + 1 })
  }
  const remove = () => {
    if(confirm(`Remove blog ${blog.title} by ${blog.author}`)){
      handleRemoveBlog(blog.id)
    }
  }

  const details = () => {
    return (
      <div>
        <div> {blog.url} </div>
        <div> {blog.likes} <button onClick={addLike}>Like</button> </div>
        <div> {blog.user.name} </div>
        {user.username === blog.user.username && (<button onClick={remove}>Remove</button>)}
      </div>
    )}

  const handleShowDetail = () => {
    setDetailsShown(!detailsShown)
  }

  return (
    <div style={blogStyle}>
      <div>
        {blog.title} {blog.author} <button onClick={handleShowDetail}>{ detailsShown ? 'Show' : 'Hide' }</button>
      </div>
      {detailsShown === false && details() }
    </div>
  )
}

export default Blog