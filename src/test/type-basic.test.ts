import type {FilterSetConfig} from '../types'
import {convertFilterSetConfig} from '../middleware'

interface ComplexData {
  id: number
}

interface Data {
  complex?: ComplexData
  number?: number
  text?: string
  new?: boolean
}
test('Error when type of attribute is passed without filter', () => {
  const simpleConfig: FilterSetConfig<Data> = {
    // @ts-expect-error plain passing is not allowed
    text: 'string',
  }
  expect(() => convertFilterSetConfig(simpleConfig)).toThrow('Cannot use \'in\' operator to search for \'value\' in string')
})

test('Error when attribute is not in data type', () => {
  const simpleConfig: FilterSetConfig<Data> = {
    // @ts-expect-error number is not part of data type
    foo: {value: 123},
  }
  const converted = convertFilterSetConfig(simpleConfig)
  expect(converted).toEqual({foo: 123})
})

test('Error when unknown filter is used', () => {
  const simpleConfig: FilterSetConfig<Data> = {
    // @ts-expect-error foo is not defined as a filter
    number: {foo: 123},
  }
  const converted = convertFilterSetConfig(simpleConfig)
  // eslint-disable-next-line camelcase
  expect(converted).toEqual({number__foo: 123})
})

test('Error when value has the wrong type', () => {
  const simpleConfig: FilterSetConfig<Data> = {
    // @ts-expect-error text is of type string
    text: {value: 123},
  }
  const converted = convertFilterSetConfig(simpleConfig)
  expect(converted).toEqual({text: 123})
})

