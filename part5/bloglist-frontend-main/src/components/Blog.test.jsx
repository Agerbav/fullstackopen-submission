import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'
import { beforeEach, describe, expect } from 'vitest'

describe('<Blog /> Component tests', () => {
  let container
  let mockHandler = null
  beforeEach(() => {
    const user = {
      name: 'admin',
      username: 'root',
    }
    const blog = {
      title: 'component test',
      author: 'admin',
      url: 'randomurl.com',
      likes: 99,
      user: user,
    }
    mockHandler = vi.fn()
    container = render(<Blog blog={blog} handleAddLike={mockHandler} handleRemoveBlog={mockHandler} user={user}></Blog>).container
  })

  test('Renders Blog', () => {
    // screen.debug()

    const div = container.querySelector('.blog')
    expect(div).toHaveTextContent('component test')
    expect(div).toHaveTextContent('admin')

    const hiddenDiv = container.querySelector('.details')
    // console.log(hiddenDiv)
    expect(hiddenDiv).toBeNull()
  })

  test('Show the url and likes when the button is clicked', async () => {
    const user = userEvent.setup()
    const button = screen.getByText('Show')
    await user.click(button)

    const div = container.querySelector('.details')
    expect(div).toBeDefined()
    expect(div).toHaveTextContent('randomurl.com')
    expect(div).toHaveTextContent('99')
  })

  test('Like button clicked twice', async () => {
    const user = userEvent.setup()
    const button = screen.getByText('Show')
    await user.click(button)

    const likeButton = screen.getByText('Like')
    await user.click(likeButton)
    await user.click(likeButton)
    // console.log(mockHandler.mock.calls)
    expect(mockHandler.mock.calls).toHaveLength(2)
    expect(mockHandler.mock.calls[0][0].likes).toBe(100)
  })

})

