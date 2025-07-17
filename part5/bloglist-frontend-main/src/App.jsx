import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [message, setMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const blogFormRef = useRef()

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
  const handleAddBlog = (blogObject) => {
    blogFormRef.current.toggleVisibility()
    blogService
      .create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        setMessage(`a new blog ${returnedBlog.title} by ${returnedBlog.author}`)

        setTimeout(() => {
          setMessage(null)
        }, 5000)
      })
  }
  const handleAddLike = (blogObject) => {
    blogService
      .update(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.map(blog => blog.id !== returnedBlog.id ? blog : returnedBlog))
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
            <Togglable buttonLabel="Add Blog" ref={blogFormRef}>
              <BlogForm handleAddBlog={handleAddBlog} />
            </Togglable>
          </div>
          <div>
            {blogs.map(blog =>
              <Blog key={blog.id} blog={blog} handleAddLike={handleAddLike} user={blog.user}/>
            )}
          </div>
        </div>
      }
    </div>
  )
}

export default App