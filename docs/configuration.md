# Configuration


## Apply configuration

```ts{5}
import axios from 'axios';
import applyDrfMiddleware from '@singularit/drf-axios-middleware';

const api = applyDrfMiddleware(axios.create(), {
    // config
});
```

## Configuration options

### `filterHandlers`

- Type: `FilterHandlers`
- Default: `undefined`

The `filterHandlers` option can be used to add custom filter operators.

See [Custom Filter Handler](./example-customization.md#custom-filter-handler) for more information.



