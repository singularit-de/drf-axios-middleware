# DRF-Axios-Middleware

<a href="https://www.npmjs.com/package/@singularit/drf-axios-middleware">
    <img src="https://img.shields.io/npm/dm/@singularit/drf-axios-middleware?color=50a36f&label=" alt="NPM Downloads">
</a>

<p align="center">
  <a href="https://www.singular-it.de/">
    <picture>
      <source media="(prefers-color-scheme: dark)"  srcset="./documents/singular_it_dark.png">
      <source media="(prefers-color-scheme: light)" srcset="./documents/singular_it_light.png">
      <img width="500px" alt="singularIT Logo" src="./documents/singular_it_light.png">
    </picture>    
  </a>
</p>
<p align="center">
  <a href="https://www.singular-it.de/">Website</a> |
  <a href="https://blog.singular-it.de/">Blog</a> |
  <a href="https://www.singular-it.de/team">Team</a>
</p>

## Features

- 🦾 TypeScript support
- 📦 CommonJS and ES Module support
- ⚙️ Works with Axios and Django Rest Framework
- 📝 Customizable
- 📚 Well documented ([Docs](https://singularit-de.github.io/drf-axios-middleware/))

## Installation

```bash
npm install @singularit/drf-axios-middleware
```

## Usage

### Basic

`@singularit/drf-axios-middleware` is a middleware for axios. It can be used with axios and django rest framework. It
introduces a new parameter `filterSet` to the axios request config. This parameter is used to filter the request url.
The filterSet is a object with the following structure:

```
{
  [field]: {
    [operator]: value
  }
}
```

By default, the operator can be one of the following:

```ts
const DefaultDRFFilters = ['in', 'exact', 'lt', 'gt', 'lte', 'gte', 'startswith', 'endswith']
```

You can use custom operators. See [Customization](#customization) for more information.

The final request url will be generated like: `url?field__operator=value`.
Fields can be nested and will be generated like: `url?field__nested__operator=value`.
See [Nested Fields](#nested-fields) for more information.

#### Example

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

### Nested Fields

Nested fields can be used to filter nested objects. The middleware will generate the correct url for you.

#### Examples

##### Basic Nested Field

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

##### Nested Field with multiple operators

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

### Customization

The middleware can be customized by passing a config object to the `applyDrfMiddleware` function.

#### Examples

##### Custom Filter Handler

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

*Note:* `notin` is not a valid operator for django rest framework. You have to implement the filter on your own.

##### Custom Filter to multiple Parameters (between to gte and lte)

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

## License

[MIT License](./LICENSE) © 2023-PRESENT singularIT GmbH
