/**
 * @jest-environment jsdom
 */
import { render, screen, cleanup } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { SWRConfig } from 'swr'
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import CommentPage from '../pages/comment-page'
import 'setimmediate'

const server = setupServer(
  rest.get(
    'https://jsonplaceholder.typicode.com/comments/',
    (req, res, ctx) => {
      const query = req.url.searchParams
      const _limit = query.get('_limit')
      if (_limit === '10') {
        return res(
          ctx.status(200),
          ctx.json([
            {
              postId: 1,
              id: 1,
              name: 'A',
              email: 'dummya@gmail.com',
              body: 'test body a',
            },
            {
              postId: 2,
              id: 2,
              name: 'B',
              email: 'dummyb@gmail.com',
              body: 'test body b',
            },
          ])
        )
      }
    }
  )
  // rest.get(
  //   'https://jsonplaceholder.typicode.com/comments/?_limit=10',
  //   (req, res, ctx) => {
  //     return res(
  //       ctx.status(200),
  //       ctx.json([
  //         {
  //           postId: 1,
  //           id: 1,
  //           name: 'A',
  //           email: 'dummya@gmail.com',
  //           body: 'test body a',
  //         },
  //         {
  //           postId: 2,
  //           id: 2,
  //           name: 'B',
  //           email: 'dummyb@gmail.com',
  //           body: 'test body b',
  //         },
  //       ])
  //     )
  //   }
  // )
)
beforeAll(() => server.listen())
afterEach(() => {
  server.resetHandlers()
  cleanup()
})
afterAll(() => server.close())

describe('Comment page with useSWR / Success+Error', () => {
  it('Should render the value fetched by useSWR ', async () => {
    render(
      <SWRConfig value={{ dedupingInterval: 0 }}>
        <CommentPage />
      </SWRConfig>
    )
    expect(await screen.findByText('1: test body a')).toBeInTheDocument()
    expect(screen.getByText('2: test body b')).toBeInTheDocument()
  })
  it('Should render Error text when fetch failed', async () => {
    server.use(
      rest.get(
        'https://jsonplaceholder.typicode.com/comments/',
        (req, res, ctx) => {
          const query = req.url.searchParams
          const _limit = query.get('_limit')
          if (_limit === '10') {
            return res(ctx.status(400))
          }
        }
      )
      // rest.get(
      //   'https://jsonplaceholder.typicode.com/comments/?_limit=10',
      //   (req, res, ctx) => {
      //     return res(ctx.status(400))
      //   }
      // )
    )
    render(
      <SWRConfig value={{ dedupingInterval: 0 }}>
        <CommentPage />
      </SWRConfig>
    )
    expect(await screen.findByText('Error!')).toBeInTheDocument()
    //screen.debug()
  })
})
