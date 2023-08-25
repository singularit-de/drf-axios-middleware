# Konfiguration


## Konfiguration anwenden

```ts{5}
import axios from 'axios';
import applyDrfMiddleware from '@singularit/drf-axios-middleware';

const api = applyDrfMiddleware(axios.create(), {
    // config
});
```

## Konfigurationsoptionen

### `filterHandlers`

- Typ: `FilterHandlers`
- Standardwert: `undefined`

Die `filterHandlers`-Option kann verwendet werden, um benutzerdefinierte Filteroperatoren hinzuzufügen.

Siehe [Benutzerdefinierte Filter-Handler](./example-customization.md#custom-filter-handler) für weitere Informationen.



