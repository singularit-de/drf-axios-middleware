import {convertFilterSetConfig} from '../middleware'
import type {FilterSetConfig} from '../types'

interface NumberData {
  number: number
  noNumber?: Date
}

interface Data {
  data: NumberData
  text?: string
  new?: boolean
}

test('it should convert objects with standard filters', () => {
  const numberData = {number: 123}
  const simpleConfig: FilterSetConfig<Data> = {
    data: {
      lt: numberData,
    },
  }
  const converted = convertFilterSetConfig(simpleConfig)
  // eslint-disable-next-line camelcase
  expect(converted).toEqual({data__lt: numberData})
})

test('it should convert objects with value filters', () => {
  const date = new Date()
  const simpleConfig: FilterSetConfig<Data> = {
    data: {
      number: {value: 123},
      noNumber: {value: date},
    },
  }
  const converted = convertFilterSetConfig(simpleConfig)
  // eslint-disable-next-line camelcase
  expect(converted).toEqual({data__number: 123, data__noNumber: date})
})

test('it should convert objects with filters', () => {
  const simpleConfig: FilterSetConfig<Data> = {
    data: {
      number: {lt: 123},
    },
  }
  const converted = convertFilterSetConfig(simpleConfig)
  // eslint-disable-next-line camelcase
  expect(converted).toEqual({data__number__lt: 123})
})

interface CircleMapping {
  // data: FilterSetMapping
  dummy: 'lt'
}

interface NumberDataMapping {
  number: 'lt' | 'gt' | 'custom1'
  circle: CircleMapping
}

interface FilterSetMapping {
  data: NumberDataMapping
  text: 'lt' | 'exact'
}

test('it should convert objects with a custom filter', () => {
  const simpleConfig: FilterSetConfig<Data, FilterSetMapping> = {
    data: {
      number: {
        custom1: 123,
      },
    },
  }
  const converted = convertFilterSetConfig(simpleConfig)
  // eslint-disable-next-line camelcase
  expect(converted).toEqual({data__number__custom1: 123})
})

interface A {
  b?: {
    c: {
      text: string
    }
  }
}

interface AMapping {
  b: {
    c: {
      text: 'exact'
    }
  }

}

test('it should convert objects with nested objects', () => {
  const simpleConfig: FilterSetConfig<A> = {
    b: {
      c: {
        text: {exact: 'foo'},
      },
    },
  }
  const converted = convertFilterSetConfig(simpleConfig)
  // eslint-disable-next-line camelcase
  expect(converted).toEqual({b__c__text__exact: 'foo'})
})

interface ALoop {
  b?: {
    c?: {
      a?: ALoop
    }
  }
  attributeA?: number
}

interface ALoopMapping {
  b: {
    c: {
      a: AMapping
    }
  }
  attributeA: 'lt'

}

test('it should convert objects with looping objects', () => {
  const simpleConfig: FilterSetConfig<ALoop, ALoopMapping> = {
    b: {
      c: {
        a: {
          attributeA: {
            lt: 123,
          },
        },
      },
    },
  }
  const converted = convertFilterSetConfig(simpleConfig)
  // eslint-disable-next-line camelcase
  expect(converted).toEqual({b__c__a__attributeA__lt: 123})
})

