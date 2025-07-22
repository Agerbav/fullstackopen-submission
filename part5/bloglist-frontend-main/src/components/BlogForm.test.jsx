import { render, screen } from '@testing-library/react'
import BlogForm from './BlogForm'
import userEvent from '@testing-library/user-event'

test('<BlogForm /> updates parent state and calls onSubmit', async () => {
  const handleAddBlog = vi.fn()
  const user = userEvent.setup()

  render(<BlogForm handleAddBlog={handleAddBlog} />)

  const inputTitle = screen.getByPlaceholderText('input title')
  const inputAuthor = screen.getByPlaceholderText('input author')
  const inputUrl = screen.getByPlaceholderText('input url')
  const submitButton = screen.getByText('Create')

  await user.type(inputTitle, 'random title')
  await user.type(inputAuthor, 'random author')
  await user.type(inputUrl, 'random url')
  await user.click(submitButton)

  console.log(handleAddBlog.mock.calls)
  expect(handleAddBlog.mock.calls).toHaveLength(1)
  expect(handleAddBlog.mock.calls[0][0].title).toBe('random title')
  expect(handleAddBlog.mock.calls[0][0].author).toBe('random author')
  expect(handleAddBlog.mock.calls[0][0].url).toBe('random url')

})