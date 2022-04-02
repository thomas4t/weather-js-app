import { NotImplementedException } from '@nestjs/common'
import { FindManyOptions } from 'typeorm'
import { PaginationArguments, Result } from './interfaces'

const defaultLimit = 10
const getSafeLimit = (limit: number) => Math.min(1000, limit)
const getSafeOffset = (offset: number) => Math.max(0, offset)

const findDataFromArguments = async <T extends { id: string }>(
  args: PaginationArguments,
  getData: (options: FindManyOptions) => Promise<T[]>,
  getCount: (options: FindManyOptions) => Promise<number>,
): Promise<Result<T>> => {
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
  if (args.limit) {
    limit = getSafeLimit(args.limit)
  }
  let offset: number
  if (args.offset) {
    offset = getSafeOffset(args.offset)
  }

  const results = await getData({ where, order, skip: offset, take: limit + 1 })
  return {
    results: results.slice(0, limit),
    count,
    hasPreviousPage: offset > 0,
    hasNextPage: results.length === limit + 1,
  }
}

export default findDataFromArguments
