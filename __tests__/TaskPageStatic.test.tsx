/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom/extend-expect'
import { render, screen, cleanup } from '@testing-library/react'
import { getPage } from 'next-page-tester'
import { initTestHelpers } from 'next-page-tester'
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import 'setimmediate'

initTestHelpers()
const server = setupServer(
  rest.get('https://jsonplaceholder.typicode.com/todos/', (req, res, ctx) => {
    const query = req.url.searchParams
    const _limit = query.get('_limit')
    if (_limit === '10') {
      return res(
        ctx.status(200),
        ctx.json([
          {
            userId: 3,
            id: 3,
            title: 'Static task C',
            completed: true,
          },
          {
            userId: 4,
            id: 4,
            title: 'Static task D',
            completed: false,
          },
        ])
      )
    }
  })
  // rest.get(
  //   'https://jsonplaceholder.typicode.com/todos/?_limit=10',
  //   (req, res, ctx) => {
  //     return res(
  //       ctx.status(200),
  //       ctx.json([
  //         {
  //           userId: 3,
  //           id: 3,
  //           title: 'Static task C',
  //           completed: true,
  //         },
  //         {
  //           userId: 4,
  //           id: 4,
  //           title: 'Static task D',
  //           completed: false,
  //         },
  //       ])
  //     )
  //   }
  // )
)
beforeAll(() => {
  server.listen()
})
afterEach(() => {
  server.resetHandlers()
  cleanup()
})
afterAll(() => {
  server.close()
})
describe(`Todo page / getStaticProps`, () => {
  it('Should render the list of tasks pre-fetched by getStaticProps', async () => {
    const { page } = await getPage({
      route: '/task-page',
    })
    render(page)
    expect(await screen.findByText('todos page')).toBeInTheDocument()
    expect(screen.getByText('Static task C')).toBeInTheDocument()
    expect(screen.getByText('Static task D')).toBeInTheDocument()
  })
})
