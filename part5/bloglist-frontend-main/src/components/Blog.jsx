import { useState } from 'react'
const Blog = ({ blog }) => {
  const [detailsShown, setDetailsShown] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const details = () => (
    <div>
      {blog.url} <br />
      {blog.likes} <button>Like</button> <br />
      {blog.user.name}
    </div>
  )

  const handleShowDetail = () => {
    setDetailsShown(!detailsShown)
  }

  return (
    <div style={blogStyle}>
      <div>
        {blog.title} {blog.author} <button onClick={handleShowDetail}>{detailsShown ? "Show" : "Hide"}</button>
      </div>
      {detailsShown === false && details() }
    </div> 
  )
   
}

export default Blog