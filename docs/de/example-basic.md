---
outline: deep
---

# Basis Beispiele

Diese Seite demonstriert einige der grundlegenden Beispiele.


## Basic Usage

Standardmäßig kann der Operator einer der folgenden sein:

```ts
const DefaultDRFFilters = ['in', 'exact', 'lt', 'gt', 'lte', 'gte', 'startswith', 'endswith']
```

::: tip
Wenn Sie benutzerdefinierte Operatoren verwenden möchten, lesen Sie [Customization](./example-customization.md).
:::

```ts
import axios from 'axios';
import applyDrfMiddleware from '@singularit/drf-axios-middleware';

const api = applyDrfMiddleware(axios.create());

// alle user mit id >= 15
api.get('/api/v1/users/', {filterSet: {id: {gte: 15}}}).then((response) => {
    console.log(response.data);
});
// request: GET /api/v1/users/?id__gte=15
```
