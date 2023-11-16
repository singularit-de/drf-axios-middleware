import type {FilterSetConfig} from '../types'
import {convertFilterSetConfig} from '../middleware'

interface SpecialNumber {
  internal: number
}

interface Data {
  number: number | SpecialNumber
}

test('it should convert a primitive of a union type', () => {
  const config: FilterSetConfig<Data> = {
    number: {lt: 123},
  }
  const converted = convertFilterSetConfig(config)
  // eslint-disable-next-line camelcase
  expect(converted).toEqual({number__lt: 123})
})

test('it should convert a complex type of a union type', () => {
  const special = {internal: 123}
  const config: FilterSetConfig<Data> = {
    number: {value: special},
  }
  const converted = convertFilterSetConfig(config)
  expect(converted).toEqual({number: special})
})

test('the config should be able to filter attributes of complex types', () => {
  const config: FilterSetConfig<Data> = {
    number: {internal: {lt: 123}},
  }
  const converted = convertFilterSetConfig(config)
  // eslint-disable-next-line camelcase
  expect(converted).toEqual({number__internal__lt: 123})
})
