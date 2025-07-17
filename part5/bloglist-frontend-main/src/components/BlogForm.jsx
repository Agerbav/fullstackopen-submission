import { useState } from 'react'
const BlogForm = ({handleAddBlog}) => {
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')

  const addBlog = (event) => {
    event.preventDefault()
    handleAddBlog({
      title: newTitle,
      author: newAuthor,
      url: newAuthor
    })

    setNewTitle('')
    setNewAuthor('')
    setNewUrl('')
  }

  return (
    <form onSubmit={addBlog}>
      <div>
        title
        <input type="text" value={newTitle} onChange={({target}) => setNewTitle(target.value)}/>
      </div>
      <div>
        author
        <input type="text" value={newAuthor} onChange={({target}) => setNewAuthor(target.value)}/>
      </div>
      <div>
        url
        <input type="text" value={newUrl} onChange={({target}) => setNewUrl(target.value)}/>
      </div>
      <button type='submit'>Create</button>
    </form>
  )
}

export default BlogForm