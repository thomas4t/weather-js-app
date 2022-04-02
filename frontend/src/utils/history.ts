import { createBrowserHistory, createMemoryHistory, History } from 'history'

// eslint-disable-next-line import/no-mutable-exports
let history: History = createMemoryHistory()
if (typeof window !== 'undefined') {
  history = createBrowserHistory()
}

export default history

export const createServerHistory = (url: string): History =>
  createMemoryHistory({
    initialEntries: [url],
  })
