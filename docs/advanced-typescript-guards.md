# Type Guards

Because the `FilterSetConfig` type is complex contains multiple possible subtypes it can be hard to access a specific attribute of the config.
To tackle this problem we offer type guards. 


## isFilterSetValue
This type guard checks if passed parameter is a `FilterSetValue`:
``` ts
const config: FilterSetConfig<Category> = {
    id: { 
        value: 1
    }
}
...
if (isFilterSetValue(config.id)){
    config.id.value = 2
}
```
::: tip
This type guard checks for undefined. So if the config contains `{value:undefined}` it will not be seen as a `FilterSetValue`
:::

## isFilterSetRange
This type guard checks if passed parameter is a `FilterSetRange`:
``` ts
const config: FilterSetConfig<Category> = {
    id: { 
        gt: 10
    }
}
...
if (isFilterSetRange(config.id)){
    config.id.gt = 3
}
```


## isFilterSetExact
This type guard checks if passed parameter is a `FilterSetExact`:
``` ts
const config: FilterSetConfig<Category> = {
    id: { 
        exact: 1
    }
}
...
if (isFilterSetExact(config.id)){
    config.id.exact = 2
}
```

## isFilterSetIn
This type guard checks if passed parameter is a `FilterSetIn`:
``` ts
const config: FilterSetConfig<Category> = {
    id: { 
        in: [1]
    }
}
...
if (isFilterSetIn(config.id)){
    config.id.in = [2,3]
}
```

## isFilterSetAffix
This type guard checks if passed parameter is a `FilterSetAffix`:
``` ts
const config: FilterSetConfig<Category> = {
    id: { 
        startswith: 1
    }
}
...
if (isFilterSetAffix(config.id)){
    config.id.startswith = 2
}
```


## isFilterSetConfig
This type guard checks if passed parameter is a `FilterSetConfig`:
This can be used for nested complex types in combination with the other type guards.

``` ts
const config: FilterSetConfig<Book> = {
    category: { 
        id: {
            value: 1
        }
    }
}
...
if (isFilterSetConfig(config.category) && isFilterSetValue(config.category.id) ){
    config.category.id.value = 2
}
```
