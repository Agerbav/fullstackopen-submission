import { useState } from 'react'


const BlogForm = ({ handleAddBlog }) => {
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')

  const addBlog = (event) => {
    event.preventDefault()
    handleAddBlog({
      title: newTitle,
      author: newAuthor,
      url: newUrl
    })

    setNewTitle('')
    setNewAuthor('')
    setNewUrl('')
  }

  return (
    <form onSubmit={addBlog}>
      <div>
        title
        <input type="text" value={newTitle} placeholder='input title' onChange={({ target }) => setNewTitle(target.value)}/>
      </div>
      <div>
        author
        <input type="text" value={newAuthor} placeholder='input author' onChange={({ target }) => setNewAuthor(target.value)}/>
      </div>
      <div>
        url
        <input type="text" value={newUrl} placeholder='input url' onChange={({ target }) => setNewUrl(target.value)}/>
      </div>
      <button type='submit'>Create</button>
    </form>
  )
}

export default BlogForm