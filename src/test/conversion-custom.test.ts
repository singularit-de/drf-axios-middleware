import {convertFilterSetConfig} from '../middleware'
import type {FilterSetConfig} from '../types'

interface Data {
  number: number
  text?: string
  new?: boolean
}

interface FilterSetMapping {
  number: 'exact' | 'lte' | 'lt' | 'gt'
  text: 'lt' | 'exact'
}

interface CustomObject {
  attribute: string
}

interface CustomFilter {
// eslint-disable-next-line @typescript-eslint/no-explicit-any
  custom1: any[]
  custom2: number
  custom3: CustomObject

}

interface CustomFilterSetMapping {
  number: 'exact' | 'lte' | 'lt' | 'gt' | 'custom1'
  text: 'lt' | 'exact' | 'custom2' | 'custom3'
}

test('it should accept a KeyConfig ', () => {
  const config: FilterSetConfig<Data, FilterSetMapping> = {
    number: {lt: 987, gt: 123},
    text: {exact: 'string'},
  }
  const converted = convertFilterSetConfig(config)
  // eslint-disable-next-line camelcase
  expect(converted).toEqual({number__gt: 123, number__lt: 987, text__exact: 'string'})
})

test('it should accept a CustomKeyConfig ', () => {
  const simpleConfig: FilterSetConfig<Data, CustomFilterSetMapping, CustomFilter> = {
    number: {custom1: ['']},
    text: {custom2: 123},
  }
  const converted = convertFilterSetConfig(simpleConfig)
  // eslint-disable-next-line camelcase
  expect(converted).toEqual({number__custom1: [''], text__custom2: 123})
})

test('it should accept a CustomKeyConfig and standard DRF filters', () => {
  const simpleConfig: FilterSetConfig<Data, CustomFilterSetMapping, CustomFilter> = {
    number: {custom1: [''], exact: 123},
    text: {custom2: 123, lt: 'foo'},
  }
  const converted = convertFilterSetConfig(simpleConfig)
  // eslint-disable-next-line camelcase
  expect(converted).toEqual({number__custom1: [''], number__exact: 123, text__custom2: 123, text__lt: 'foo'})
})

test('it should convert the filter defined with a custom filter handler', () => {
  const obj = {attribute: ''}
  const simpleConfig: FilterSetConfig<Data, CustomFilterSetMapping, CustomFilter> = {
    number: {custom1: [''], exact: 123},
    text: {custom3: obj, lt: 'foo'},
  }
  const converted = convertFilterSetConfig(simpleConfig, {
    custom1: (_key, _value) => {
      return [{key: 'handler', value: 987}]
    },
    custom3: (key, value, data) => {
      const list = []
      if (data && data[key] && 'attribute' in data[key])
        list.push({key: 'custom', value: data[key]})

      return list
    },
  })
  // eslint-disable-next-line camelcase
  expect(converted).toEqual({number__handler: 987, number__exact: 123, text__custom: obj, text__lt: 'foo'})
})

test('it should convert the filter defined with a custom filter handler with value shortcut', () => {
  const simpleConfig: FilterSetConfig<Data, CustomFilterSetMapping, CustomFilter> = {
    number: {custom1: ['1', '4'], exact: 123},
  }
  const converted = convertFilterSetConfig(simpleConfig, {
    custom1: (key, value) => {
      return [{key, value}]
    },
  })
  // eslint-disable-next-line camelcase
  expect(converted).toEqual({number__custom1: ['1', '4'], number__exact: 123})
})
