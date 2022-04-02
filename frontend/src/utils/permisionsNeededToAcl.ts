const permisionsNeededToAcl = (permisionsNeeded?: string): [string, string] | [undefined, undefined] => {
  if (!permisionsNeeded) return [undefined, undefined]
  const parts = `${permisionsNeeded}`.split(':')
  if (parts.length !== 2) throw new Error('Argument neededAllowed must a string with one double colon as separator or undefined.')
  return [parts[0], parts[1]]
}

export default permisionsNeededToAcl
