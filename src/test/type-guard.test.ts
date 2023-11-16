import type {FilterSetConfig} from '../types'
import {isFilterSetRange} from '../guards'
import {convertFilterSetConfig} from '../middleware'

interface Data {
  number: number
}

test('it should not be possible to set a in Filter by using a range guard', () => {
  const config: FilterSetConfig<Data> = {
    number: {gt: 123},
  }
  if (isFilterSetRange(config.number))
    // @ts-expect-error in has type never
    config.number.in = [3]

  const converted = convertFilterSetConfig(config)
  // eslint-disable-next-line camelcase
  expect(converted).toEqual({number__gt: 123, number__in: [3]})
})
