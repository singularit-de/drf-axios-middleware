import type {FilterSetConfig} from '../types'
import {isFilterSetAffix, isFilterSetConfig, isFilterSetIn, isFilterSetRange, isFilterSetValue} from '../guards'
import {convertFilterSetConfig} from '../middleware'

interface Data {
  number: number
}

test('it should be possible to set a value by using a guard', () => {
  const config: FilterSetConfig<Data> = {
    number: {value: 123},
  }
  if (isFilterSetValue(config.number))
    config.number.value = 3

  const converted = convertFilterSetConfig(config)
  expect(converted).toEqual({number: 3})
})

test('if its not a FilterSetValue it should not be editable', () => {
  const config: FilterSetConfig<Data> = {
    number: {lt: 123},
  }
  if (isFilterSetValue(config.number))
    config.number.value = 3

  const converted = convertFilterSetConfig(config)
  // eslint-disable-next-line camelcase
  expect(converted).toEqual({number__lt: 123})
})

test('it should be possible to set a range by using a guard', () => {
  const config: FilterSetConfig<Data> = {
    number: {gt: 123},
  }
  if (isFilterSetRange(config.number))
    config.number.gt = 3

  const converted = convertFilterSetConfig(config)
  // eslint-disable-next-line camelcase
  expect(converted).toEqual({number__gt: 3})
})

test('if its not a isFilterSetRange it should not be editable', () => {
  const config: FilterSetConfig<Data> = {
    number: {value: 123},
  }
  if (isFilterSetRange(config.number))
    config.number.gt = 3

  const converted = convertFilterSetConfig(config)
  expect(converted).toEqual({number: 123})
})

test('it should be possible to set a in filter by using a guard', () => {
  const numberList = [1, 2, 3]
  const config: FilterSetConfig<Data> = {
    number: {in: numberList},
  }
  if (isFilterSetIn(config.number))
    config.number.in = [4]

  const converted = convertFilterSetConfig(config)
  // eslint-disable-next-line camelcase
  expect(converted).toEqual({number__in: [4]})
})

test('if its not a isFilterSetIn it should not be editable', () => {
  const config: FilterSetConfig<Data> = {
    number: {value: 123},
  }
  if (isFilterSetIn(config.number))
    config.number.in = [3]

  const converted = convertFilterSetConfig(config)
  expect(converted).toEqual({number: 123})
})

test('it should be possible to set a in affix by using a guard', () => {
  const config: FilterSetConfig<Data> = {
    number: {startswith: 123},
  }
  if (isFilterSetAffix(config.number))
    config.number.startswith = 4

  const converted = convertFilterSetConfig(config)
  // eslint-disable-next-line camelcase
  expect(converted).toEqual({number__startswith: 4})
})

test('if its not a isFilterSetAffix it should not be editable', () => {
  const config: FilterSetConfig<Data> = {
    number: {value: 123},
  }
  if (isFilterSetAffix(config.number))
    config.number.startswith = 4

  const converted = convertFilterSetConfig(config)
  expect(converted).toEqual({number: 123})
})

interface Complex {
  id: number
}

interface ComplexData {
  complex: Complex
}

test('it should be possible to set a range by using a guard', () => {
  const config: FilterSetConfig<ComplexData> = {
    complex: {id: {value: 123}},
  }
  if (isFilterSetConfig(config.complex) && isFilterSetValue(config.complex.id))
    config.complex.id.value = 3

  const converted = convertFilterSetConfig(config)
  // eslint-disable-next-line camelcase
  expect(converted).toEqual({complex__id: 3})
})

test('if its not a isFilterSetConfig it should not be editable', () => {
  const complexData = {id: 123}
  const config: FilterSetConfig<ComplexData> = {
    complex: {value: complexData},
  }
  if (isFilterSetConfig(config.complex) && isFilterSetValue(config.complex.id))
    config.complex.id.value = 3

  const converted = convertFilterSetConfig(config)
  expect(converted).toEqual({complex: complexData})
})

