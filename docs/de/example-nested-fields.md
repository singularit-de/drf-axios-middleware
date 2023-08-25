---
outline: deep
---

# Nested Felder Beispiele

Diese Seite demonstriert einige Beispiele für Nested Felder.

## Basis Nested Feld

```ts
import axios from 'axios';
import applyDrfMiddleware from '@singularit/drf-axios-middleware';

const api = applyDrfMiddleware(axios.create());

// alle user mit id >= 15
api.get('/api/v1/users/', {filterSet: {profile: {id: {gte: 15}}}}).then((response) => {
    console.log(response.data);
});

// request: GET /api/v1/users/?profile__id__gte=15
```
## Nested Feld mit mehreren Operatoren

```ts
import axios from 'axios';
import applyDrfMiddleware from '@singularit/drf-axios-middleware';

const api = applyDrfMiddleware(axios.create());

// alle user mit id >= 15 and id <= 99
api.get('/api/v1/users/', {filterSet: {profile: {id: {gte: 15, lte: 99}}}}).then((response) => {
    console.log(response.data);
});

// request: GET /api/v1/users/?profile__id__gte=15&profile__id__lte=99
```
