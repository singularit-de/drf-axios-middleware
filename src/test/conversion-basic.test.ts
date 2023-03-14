import type {FilterSetConfig} from '../types'
import {convertFilterSetConfig} from '../middleware'

interface Data {
  number: number
  text?: string
  new?: boolean
}

test('it should convert simple value filters', () => {
  const simpleConfig: FilterSetConfig<Data> = {
    number: {value: 123},
    text: {value: 'string'},
  }
  const converted = convertFilterSetConfig(simpleConfig)
  expect(converted).toEqual({number: 123, text: 'string'})
})

test('it should map exact filters', () => {
  const simpleConfig: FilterSetConfig<Data> = {
    number: {exact: 123},
    text: {exact: 'string'},
  }
  const converted = convertFilterSetConfig(simpleConfig)
  // eslint-disable-next-line camelcase
  expect(converted).toEqual({number__exact: 123, text__exact: 'string'})
})

test('it should map gte filters', () => {
  const simpleConfig: FilterSetConfig<Data> = {
    number: {gte: 123},
    text: {gte: 'string'},
  }
  const converted = convertFilterSetConfig(simpleConfig)
  // eslint-disable-next-line camelcase
  expect(converted).toEqual({number__gte: 123, text__gte: 'string'})
})

test('it should map gt filters', () => {
  const simpleConfig: FilterSetConfig<Data> = {
    number: {gt: 123},
    text: {gt: 'string'},
  }
  const converted = convertFilterSetConfig(simpleConfig)
  // eslint-disable-next-line camelcase
  expect(converted).toEqual({number__gt: 123, text__gt: 'string'})
})

test('it should map lte filters', () => {
  const simpleConfig: FilterSetConfig<Data> = {
    number: {lte: 123},
    text: {lte: 'string'},
  }
  const converted = convertFilterSetConfig(simpleConfig)
  // eslint-disable-next-line camelcase
  expect(converted).toEqual({number__lte: 123, text__lte: 'string'})
})
test('it should map gt filters', () => {
  const simpleConfig: FilterSetConfig<Data> = {
    number: {lt: 123},
    text: {lt: 'string'},
  }
  const converted = convertFilterSetConfig(simpleConfig)
  // eslint-disable-next-line camelcase
  expect(converted).toEqual({number__lt: 123, text__lt: 'string'})
})

test('it should map multiple filters', () => {
  const simpleConfig: FilterSetConfig<Data> = {
    number: {lt: 987, gt: 123},
    text: {lt: 'string', gt: 'foo'},
  }
  const converted = convertFilterSetConfig(simpleConfig)
  // eslint-disable-next-line camelcase
  expect(converted).toEqual({number__gt: 123, number__lt: 987, text__lt: 'string', text__gt: 'foo'})
})
