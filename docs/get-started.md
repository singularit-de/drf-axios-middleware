# Get Started

## Installation

```bash
npm install @singularit/drf-axios-middleware
```

## Usage Example

`@singularit/drf-axios-middleware` is a middleware for axios. It can be used with axios and django rest framework. It
introduces a new parameter `filterSet` to the axios request config. This parameter is used to generate a valid params
for django rest framework.

The `filterSet` is an object with the following structure:

```js
{
  [field]: {
    [operator]: value
    // or
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

// get all users with id >= 15
api.get('/api/v1/users/', {filterSet: {id: {gte: 15}}}).then((response) => {
    console.log(response.data)
});
```
