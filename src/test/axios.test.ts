import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import type {FilterSetConfig} from '../types'
import {applyDRFInterceptor} from '../middleware'

const client = applyDRFInterceptor(
  axios.create({
    baseURL: 'http://example.com',
  }),
)

const mock = new MockAdapter(client, {})

interface Data {
  number: number
  text?: string
  new?: boolean
}

test('it should be converted on success', (done) => {
  const simpleConfig: FilterSetConfig<Data> = {
    number: {exact: 123},
    text: {lt: 'foo'},
  }

  const params = {
    filterSet: simpleConfig,
  }

  mock.onGet('/success').reply((config) => {
    expect(config.method).toBe('get')
    expect(config.params.number__exact).toBe(123)
    expect(config.params.text__lt).toBe('foo')
    return [
      200,
      {},
    ]
  })
  client
    .get('/success', {
      headers: {
        xRequestedWith: 'XMLHttpRequest',
      },
      params,
    })
    .then((response) => {
      expect(JSON.stringify(response.data)).toBe(JSON.stringify({}))
      done()
    })
    .catch((error) => {
      done(error)
    })
})

