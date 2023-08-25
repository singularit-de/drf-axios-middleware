# Loslegen

## Installation

```bash
npm install @singularit/drf-axios-middleware
```

## Einführung

`@singularit/drf-axios-middleware` ist eine middleware für axios. Sie kann mit axios und django rest framework verwendet werden.
Es führt einen neuen Parameter `filterSet` in die axios-Anfragekonfiguration ein. 
Dieser Parameter wird verwendet, um valide Parameter zu erzeugen, die vom django rest framework akzeptiert werden.

Das `filterSet` übergibt man als Objekt mit folgender Struktur:

```
{
  [field]: {
    [operator]: value
    // oder
    [...nestedFields]: {
      [operator]: value
    }
  }
}
```

```ts
import axios from 'axios'
import applyDrfMiddleware from '@singularit/drf-axios-middleware'

const api = applyDrfMiddleware(axios.create())

// alle user mit id >= 15
api.get('/api/v1/users/', {filterSet: {id: {gte: 15}}}).then((response) => {
    console.log(response.data)
});
```
