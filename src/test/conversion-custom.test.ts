import {applyDRFInterceptor, convertFilterSetConfig} from '../middleware'
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

  custom1: any[]
  custom2: CustomObject

}

interface CustomFilterSetMapping {
  number: 'exact' | 'lte' | 'lt' | 'gt' | 'custom1'
  text: 'lt' | 'exact' | 'custom2'
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
  const customObject: CustomObject = {attribute: ''}
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

test('it should convert the filter defined with a custom filter handler', () => {
  const customObject = {attribute: ''}
  const simpleConfig: FilterSetConfig<Data, CustomFilterSetMapping, CustomFilter> = {
    number: {custom1: [''], exact: 123},
    text: {custom2: customObject, lt: 'foo'},
  }
  const converted = convertFilterSetConfig(simpleConfig, {
    custom1: (key, data) => {
      return [{key: 'handler', value: 987}]
    },
    custom2: (key, data) => {
      const list = []
      if (data && 'attribute' in data)
        list.push({key: 'custom', value: data.attribute})

      return list
    },
  })
  // eslint-disable-next-line camelcase
  expect(converted).toEqual({number__handler: 987, number__exact: 123, text__custom: '', text__lt: 'foo'})
})

