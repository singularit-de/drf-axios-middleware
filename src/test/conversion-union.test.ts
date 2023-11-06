import type {FilterSetConfig} from '../types'
import {convertFilterSetConfig} from '../middleware'

interface SpecialNumber {
  internal: number
}

interface Data {
  number: number | SpecialNumber
}

test('it should convert a primitive of a union type', () => {
  const simpleConfig: FilterSetConfig<Data> = {
    number: {lt: 123},
  }
  const converted = convertFilterSetConfig(simpleConfig)
  // eslint-disable-next-line camelcase
  expect(converted).toEqual({number__lt: 123})
})

test('it should convert a complex type of a union type', () => {
  const special = {internal: 123}
  const simpleConfig: FilterSetConfig<Data> = {
    number: {value: special},
  }
  const converted = convertFilterSetConfig(simpleConfig)
  expect(converted).toEqual({number: special})
})

test('the config should be able to filter attributes of complex types', () => {
  const simpleConfig: FilterSetConfig<Data> = {
    number: {internal: {value: 123}},
  }
  const converted = convertFilterSetConfig(simpleConfig)
  // eslint-disable-next-line camelcase
  expect(converted).toEqual({number__internal: 123})
})
