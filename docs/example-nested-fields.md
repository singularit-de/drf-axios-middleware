---
outline: deep
---

# Nested Fields Examples

This page demonstrates some of the nested fields examples provided by DRF axios middleware.

## Basic Nested Field

```ts
import axios from 'axios';
import applyDrfMiddleware from '@singularit/drf-axios-middleware';

const api = applyDrfMiddleware(axios.create());

// get all users with id >= 15
api.get('/api/v1/users/', {filterSet: {profile: {id: {gte: 15}}}}).then((response) => {
    console.log(response.data);
});

// request: GET /api/v1/users/?profile__id__gte=15
```
## Nested Field with multiple operators

```ts
import axios from 'axios';
import applyDrfMiddleware from '@singularit/drf-axios-middleware';

const api = applyDrfMiddleware(axios.create());

// get all users with id >= 15 and id <= 99
api.get('/api/v1/users/', {filterSet: {profile: {id: {gte: 15, lte: 99}}}}).then((response) => {
    console.log(response.data);
});

// request: GET /api/v1/users/?profile__id__gte=15&profile__id__lte=99
```
