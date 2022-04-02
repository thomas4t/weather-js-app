// to avoid TS errors like:
// Cannot find module './foobar.png' or its corresponding type declarations.ts(2307)
// @see https://stackoverflow.com/a/57176553/3540591
declare module '*.jpg'
declare module '*.gif'
declare module '*.png'
declare module '*.svg'
