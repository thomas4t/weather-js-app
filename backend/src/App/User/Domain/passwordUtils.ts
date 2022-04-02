import { PBKDF2, lib } from 'crypto-js'
import * as jwt from 'jsonwebtoken'

const options = { keySize: 512 / 32, iterations: 1000 }

export const createToken = (id: string, email: string): string => {
  return jwt.sign({ id, email }, 'secret')
}

export const verifyToken = (token: string) => jwt.verify(token, 'secret')

export const createPasswordHashAndSalt = (password: string): [string, string] => {
  const salt = lib.WordArray.random(128).toString()
  // this sync function has potential to slow down whole app for all users
  // TODO: perform a test and consider async PBKDF2 if needed
  const passwordHash = PBKDF2(password, salt, options).toString()
  return [passwordHash, salt.toString()]
}

export const isPasswordHashAndSaltEqual = (comparedHash: string, password: string, salt: string): boolean => {
  // this sync function has potential to slow down whole app
  // TODO: perform a test and consider async PBKDF2 if needed
  const passwordHash = PBKDF2(password, salt, options).toString()
  return passwordHash === comparedHash
}
