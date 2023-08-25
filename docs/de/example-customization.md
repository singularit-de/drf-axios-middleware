---
outline: deep
---

# Benutzerdefinierte Beispiele

::: tip
Die middleware kann durch Übergabe eines Konfigurationsobjekts an die `applyDrfMiddleware` Funktion angepasst werden. Weitere Informationen zu den verfügbaren Optionen finden Sie unter [Konfiguration](./configuration.md).
:::

## Benutzerdefinierte Filter-Handler

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

// alle nutzer mit id != 1, 2 oder 3 
api.get('/api/v1/users/', {filterSet: {id: {notIn: [1, 2, 3]}}}).then((response) => {
    console.log(response.data);
});

// request: GET /api/v1/users/?id__notin=1,2,3 
// Achtung: die schreibweise des query parameters hängt von der Art des Array Serializers ab.
```

::: warning
`notin` ist kein gültiger Operator für Django Rest Framework. Sie müssen den Filter selbst implementieren.
:::

## Benutzerdefinierter Filter für mehrere Parameter (between zu gte und lte)

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

// alle user mit id zwischen 1 und 99
api.get('/api/v1/users/', {filterSet: {id: {between: [1, 99]}}}).then((response) => {
    console.log(response.data);
});

// request: GET /api/v1/users/?id__gte=1&id__lte=99
```
