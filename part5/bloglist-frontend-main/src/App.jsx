import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [message, setMessage] = useState(null)
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUserJSON')
    if(loggedUserJSON){
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try{
      const user = await loginService.login({
        username, password
      })
      window.localStorage.setItem('loggedUserJSON', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    }catch(exception){
      setMessage('wrong username or password')
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }
  const handleAddBlog = (event) => {
    event.preventDefault()
    const newObject = {
      title: newTitle,
      author: newAuthor,
      url: newAuthor
    }

    blogService
      .create(newObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        setMessage(`a new blog ${newTitle} by ${newAuthor}`)
        setNewTitle('')
        setNewAuthor('')
        setNewUrl('')
        setTimeout(() => {
          setMessage(null)
        }, 5000)
      })
      
    
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        Username
        <input type="text" value={username} name='Username' onChange={({target}) => setUsername(target.value)}/>
      </div>
      <div>
        Password
        <input type="text" value={password} name='Password' onChange={({target}) => setPassword(target.value)}/>
      </div>
      <button type='submit'>Login</button>
    </form>
  )
  const addBlogForm = () => (
    <form onSubmit={handleAddBlog}>
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

  const handleLogout = (event) => {
    window.localStorage.clear()
    window.location.reload()
  }


  return (
    <div>
      <h2>blogs</h2>
      <Notification message={message}/>
      {user === null 
        ? loginForm() :
        <div>
          <p>{user.name} Logged in <button onClick={handleLogout}>Log Out</button></p>
          <div>
            {addBlogForm()}
          </div>
          <div>
            {blogs.map(blog =>
              <Blog key={blog.id} blog={blog} />
            )}
          </div>
          
        </div>
      }
    </div>
  )
}

export default App