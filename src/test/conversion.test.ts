import {applyDRFInterceptor, convertFilterSetConfig} from '../middleware'
import type {FilterSetConfig} from '../types'

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

interface FilterSetMapping {
  number: 'exact' | 'lte' | 'lt' | 'gt'
  text: 'lt' | 'exact'
}

test('it should accept a KeyConfig ', () => {
  const simpleConfig: FilterSetConfig<Data, FilterSetMapping> = {
    number: {lt: 987, gt: 123},
    text: {exact: 'string'},
  }
  const converted = convertFilterSetConfig(simpleConfig)
  // eslint-disable-next-line camelcase
  expect(converted).toEqual({number__gt: 123, number__lt: 987, text__exact: 'string'})
})

interface CustomObject {
  attribute: string
}

interface CustomFilter {

  custom1: any[]
  custom2: CustomObject

}

interface CustomFilterSetMapping {
  number: 'exact' | 'lte' | 'lt' | 'gt' | 'custom1'
  text: 'lt' | 'exact' | 'custom2'
}

test('it should accept a CustomKeyConfig ', () => {
  const customObject = {attribute: ''}
  const simpleConfig: FilterSetConfig<Data, CustomFilterSetMapping, CustomFilter> = {
    number: {custom1: ['']},
    text: {custom2: customObject},
  }
  const converted = convertFilterSetConfig(simpleConfig)
  // eslint-disable-next-line camelcase
  expect(converted).toEqual({number__custom1: [''], text__custom2: customObject})
})

test('it should accept a CustomKeyConfig and standard DRF filters', () => {
  const customObject = {attribute: ''}
  const simpleConfig: FilterSetConfig<Data, CustomFilterSetMapping, CustomFilter> = {
    number: {custom1: [''], exact: 123},
    text: {custom2: customObject, lt: 'foo'},
  }
  const converted = convertFilterSetConfig(simpleConfig)
  // eslint-disable-next-line camelcase
  expect(converted).toEqual({number__custom1: [''], number__exact: 123, text__custom2: customObject, text__lt: 'foo'})
})
