# Get Started

## Installation

```bash
npm install @singularit/drf-axios-middleware
```

## Usage Example

`@singularit/drf-axios-middleware` is a middleware for axios. It can be used with axios and django rest framework. It
introduces a new parameter `filterSet` to the axios request config. This parameter is used to filter the request url.
The `filterSet` is a object with the following structure:

```js{4}
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

```ts{4}
import axios from 'axios'
import applyDrfMiddleware from '@singularit/drf-axios-middleware'

const api = applyDrfMiddleware(axios.create())

// get all users with id >= 15
api.get('/api/v1/users/', {filterSet: {id: {gte: 15}}}).then((response) => {
    console.log(response.data)
});
```
