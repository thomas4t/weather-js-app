import get from 'lodash/get'

declare global {
  interface Window {
    env: object // eslint-disable-line @typescript-eslint/ban-types
  }
}

const getConfig = (): Record<string, any> => (typeof window === 'undefined' ? process.env : window.env)

const getRuntimeConfig = (path?: string, defaultValue?: string): any => {
  const config = getConfig()
  if (typeof path === 'undefined' || path === null) return config
  return get(config, path) || defaultValue
}

export default getRuntimeConfig
