---
outline: deep
---

# Basic Examples

This page demonstrates some of the basic examples provided by DRF axios middleware.

## Basic Usage

By default, the operator can be one of the following:

```ts
const DefaultDRFFilters = ['in', 'exact', 'lt', 'gt', 'lte', 'gte', 'startswith', 'endswith']
```

::: tip
You can use custom operators. See [Customization](./example-customization.md) for more information.
:::

```ts
import axios from 'axios';
import applyDrfMiddleware from '@singularit/drf-axios-middleware';

const api = applyDrfMiddleware(axios.create());

// get all users with id >= 15
api.get('/api/v1/users/', {filterSet: {id: {gte: 15}}}).then((response) => {
    console.log(response.data);
});
// request: GET /api/v1/users/?id__gte=15
```
