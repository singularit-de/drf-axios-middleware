import type {FilterSetConfig} from '../types'
import {isFilterSetExact, isFilterSetRange, isFilterSetValue} from '../guards'
import {convertFilterSetConfig} from '../middleware'

interface Data {
  number: number
}

interface FilterSetKeyConfig {
  number: 'exact' | 'lte' | 'lt' | 'gt'
}

test('it should be possible to set a value by using a guard with a key config', () => {
  const config: FilterSetConfig<Data, FilterSetKeyConfig> = {
    number: {exact: 123},
  }
  if (isFilterSetExact(config.number))
    config.number.exact = 3

  const converted = convertFilterSetConfig(config)
  // eslint-disable-next-line camelcase
  expect(converted).toEqual({number__exact: 3})
})

test('if the config is not a FilterSetValue it should not be editable with a key config', () => {
  const config: FilterSetConfig<Data> = {
    number: {lt: 123},
  }
  if (isFilterSetValue(config.number))
    config.number.value = 3

  const converted = convertFilterSetConfig(config)
  // eslint-disable-next-line camelcase
  expect(converted).toEqual({number__lt: 123})
})

test('it should be possible to set a value by using a guard with a key config', () => {
  const config: FilterSetConfig<Data, FilterSetKeyConfig> = {
    number: {value: 123},
  }
  if (isFilterSetValue(config.number))
    config.number.value = 3

  const converted = convertFilterSetConfig(config)
  expect(converted).toEqual({number: 3})
})

test('it should be possible to set range by using a guard with a key config', () => {
  const config: FilterSetConfig<Data, FilterSetKeyConfig> = {
    number: {lt: 123},
  }
  if (isFilterSetRange(config.number))
    config.number.lt = 3

  const converted = convertFilterSetConfig(config)
  // eslint-disable-next-line camelcase
  expect(converted).toEqual({number__lt: 3})
})
