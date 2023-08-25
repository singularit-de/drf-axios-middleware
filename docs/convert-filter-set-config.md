# `convertFilterSetConfig`

If you want to write your own middleware, you can use the `convertFilterSetConfig` function to convert the filterSet
to the corresponding object.

## Example

```ts
import {convertFilterSetConfig, FilterSetConfig} from '@singularit/drf-axios-middleware'

interface Data {
    number: number
    text?: string
    new?: boolean
}

const simpleConfig: FilterSetConfig<Data> = {
    number: {gt: 123},
    text: {gt: 'string'},
}

console.log(convertFilterSetConfig(simpleConfig))
// output: {number__gt: 123, text__gt: 'string'}
```
