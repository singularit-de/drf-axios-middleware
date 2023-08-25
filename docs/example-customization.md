---
outline: deep
---

# Customization Examples

::: tip
The middleware can be customized by passing a config object to the `applyDrfMiddleware` function. See [Configuration](./configuration.md) for more information about the available options.
:::

## Custom Filter Handler

```ts
import axios from 'axios';
import applyDrfMiddleware from '@singularit/drf-axios-middleware';

const api = applyDrfMiddleware(axios.create(), {
    filterHanlder: {
        notIn: (key, value) => {
            return [{key: 'notin', value: value}]
        }
    }
});

// get all users with id not 1, 2 or 3 
api.get('/api/v1/users/', {filterSet: {id: {notIn: [1, 2, 3]}}}).then((response) => {
    console.log(response.data);
});

// request: GET /api/v1/users/?id__notin=1,2,3 
// Note: depends on your array serializer
```

::: warning
`notin` is not a valid operator for django rest framework. You have to implement the filter on your own.
:::

## Custom Filter to multiple Parameters (between to gte and lte)

```ts
import axios from 'axios';
import applyDrfMiddleware from '@singularit/drf-axios-middleware';

const api = applyDrfMiddleware(axios.create(), {
    filterHanlder: {
        between: (key, value) => {
            return [
                {key: 'gte', value: value[0]},
                {key: 'lte', value: value[1]}
            ]
        }
    }
});

// get all users with id between 1 and 99
api.get('/api/v1/users/', {filterSet: {id: {between: [1, 99]}}}).then((response) => {
    console.log(response.data);
});

// request: GET /api/v1/users/?id__gte=1&id__lte=99
```
