# Typescript

This package exposes the type `FilterSetConfig` for typing hints. 
The Type is generic and expects at least one Parameter.
In the following section examples are given on how to use these types to achieve different typing behaviours.


## Data Parameter
Let's assume there exists a model `Category`:
``` ts
interface Category {
    id: number
    name: string
}
```
Passing the `Category` type as the first type parameter allows only attributes that the interface actually posses:
``` ts
const config: FilterSetConfig<Category> = {
    id: { 
        in: [1,2,3]
    }
}
```

### Nested Types
Nested types are also supported:
``` ts
interface Book {
    id: number
    category: Category
}

...

const config: FilterSetConfig<Book> = {
    category: { 
        id:{
            in: [1,2,3]
        }
    }
}
```

## Key-Configuration

With a key configuration it is possible to specify which filters are valid for a specific parameter.
``` ts
interface CategoryKeyConfig {
    name : 'exact' | 'startwith' | 'endswith'
}

...

const config: FilterSetConfig<Category, CategoryKeyConfig> = {
    name: { 
        exact: 'Fantasy'
    }
}
```
This would only allow `exact`, `startwith` and `endswith` for the `name` attribute

::: tip
Attributes that are not mentioned in the key configuration still allow all filters. 
Note that the `value` filter cannot be disallowed.
:::

### Nested Types

For nested types the config could look like so:
``` ts
interface BookKeyConfig {
    category : {
        name: 'exact' | 'startwith' | 'endswith'
    }
}
```
This is a little redundant but that way it is possible to define different behaviours for the models.
To remove the redundant Part the config can also be written like this:
``` ts
interface BookKeyConfig {
    category : CategoryKeyConfig
}
```

## Custom Filter
Custom Filter can be defined via:
``` ts
interface CustomFilter {
  notIn: any[]
}
```
::: warning
There is no generic type hinting for custom filters yet.
Using `any` as the type allows the filter to be used everywhere but also loosens the typing of the passed value.
:::

To enable type hinting them they need to be added to a key configuration.
``` ts
interface CategoryKeyConfig {
  id: 'in' | 'notIn'
}

...

const config: FilterSetConfig<Category, CategoryKeyConfig, CustomFilter> = {
    id: { 
        notIn: [1,2,3]
    }
}
```
