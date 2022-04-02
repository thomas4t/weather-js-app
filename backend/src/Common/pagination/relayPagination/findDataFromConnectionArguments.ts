/* eslint-disable dot-notation */
import { NotImplementedException, BadRequestException } from '@nestjs/common'
import { FindManyOptions } from 'typeorm'
import { ConnectionArguments } from './interfaces'

const defaultLimit = 10
const getSafeLimit = (limit: number) => Math.min(1000, limit)

export type DataFromConnectionArgumentsResults<T> = {
  results: { node: T; cursor: string }[]
  count: number
  startCursor?: string
  endCursor?: string
  hasPreviousPage: boolean
  hasNextPage: boolean
}

const encodeCursor = (id: string, offset: number, itemPosition: number): string => {
  const string = [id, (parseInt(`${offset}`, 10) || 0) + itemPosition].join('|')
  return Buffer.from(string).toString('base64')
}

const decodeCursor = (cursor: string): [string, number] => {
  const parts = Buffer.from(cursor, 'base64').toString('ascii').split('|')
  return [parts[0], parseInt(parts[1], 10)]
}

const findDataFromConnectionArguments = async <T extends { id: string }>(
  args: ConnectionArguments,
  getData: (options: FindManyOptions) => Promise<T[]>,
  getCount: (options: FindManyOptions) => Promise<number>,
): Promise<DataFromConnectionArgumentsResults<T>> => {
  const where: { [key: string]: any } = {}
  args?.filter?.forEach((filter) => {
    Object.entries(filter).forEach(([fieldName, filters]) => {
      Object.entries(filters).forEach(([comparator, filterValue]) => {
        if (comparator === 'eq') {
          where[fieldName] = filterValue
        } else {
          throw new NotImplementedException(`Filter comparator ${comparator} not implemented.`)
        }
      })
    })
  })

  const count = await getCount({ where })

  const order: { [key: string]: any } = {}
  args?.sort?.forEach(({ field: fieldName, order: orderDirection }) => {
    order[fieldName] = orderDirection
  })

  let limit: number = defaultLimit
  if (args.first) {
    limit = getSafeLimit(args.first)
  }
  let offset: number
  if (args.last) {
    limit = getSafeLimit(args.last)
    offset = count - args.last
  }
  if (args.first && args.last) {
    throw new BadRequestException(
      `Select both "first" and "last". That must be a mistake and it would result to non-sense. Choose one of them.`,
    )
  }

  if (args.after) {
    const decoded = decodeCursor(args.after)
    offset = decoded[1] // eslint-disable-line prefer-destructuring
    limit = getSafeLimit(args.first)
  }
  if (args.before) {
    const decoded = decodeCursor(args.before)
    limit = getSafeLimit(args.first)
    offset = Math.max(0, decoded[1] - 1 - limit)
  }
  if (args.before && args.after) {
    throw new BadRequestException(
      `Select both "before" and "after". That must be a mistake and it would result to non-sense. Choose one of them.`,
    )
  }

  const resultsWithOneMore = await getData({ where, order, skip: offset, take: limit + 1 })
  const results = resultsWithOneMore.slice(0, limit)
  return {
    results: results.map((row, i) => ({ node: row, cursor: encodeCursor(row.id, offset, i + 1) })),
    count,
    startCursor: results[0]?.id,
    endCursor: results[results.length - 1]?.id,
    hasPreviousPage: offset > 0,
    hasNextPage: resultsWithOneMore.length === limit + 1,
  }
}

export default findDataFromConnectionArguments
