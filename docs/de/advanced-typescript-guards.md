# Type Guards

Weil der `FilterSetConfig` Typ sich aus mehreren Subtypen zusammensetzt ist es nicht einfach auf die Attribute zuzugreifen.
Aus diesem Grund stellt die Bibliothek Type-Guards bereit.


## isFilterSetValue
Dieser Type-Guard überprüft ob der übergebene Paramneter vom Typ `FilterSetValue`ist:
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
Dieser Type-Guard überprüft ob value nicht undefined ist. Wenn die Konfiguration `{value:undefined}` enthält wird diese nicht `FilterSetValue` erkannt.
:::

## isFilterSetRange
Dieser Type-Guard überprüft ob der übergebene Paramneter vom Typ `FilterSetRange`ist:
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
Dieser Type-Guard überprüft ob der übergebene Paramneter vom Typ `FilterSetExact`ist:
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
Dieser Type-Guard überprüft ob der übergebene Paramneter vom Typ `FilterSetIn`ist:
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
Dieser Type-Guard überprüft ob der übergebene Paramneter vom Typ `FilterSetAffix`ist:
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
Dieser Type-Guard überprüft ob der übergebene Paramneter vom Typ `FilterSetConfig`ist:
Dieser kann in kombinaion mit anderen Guards genutzt werden für Komplexe Type,

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
