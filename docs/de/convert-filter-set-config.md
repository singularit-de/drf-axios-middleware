# `convertFilterSetConfig`

Wenn Sie Ihre eigene Middleware schreiben möchten, können Sie die Funktion `convertFilterSetConfig` verwenden, um das `filterSet` in das entsprechende Objekt zu konvertieren.

## Beispiel

```ts{14}
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
// ausgabe: {number__gt: 123, text__gt: 'string'}
```
