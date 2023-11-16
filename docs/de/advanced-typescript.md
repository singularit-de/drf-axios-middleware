# Typescript

Dieses Package nutzt den Typ `FilterSetConfig` für Type-Hints.
Der Typ ist Generisch aud erwartet mindestens einen Parameter.
Im den folgenden Abschnitten werden beispiele Vorgestellt, wie diese genutzt werden können um verschiedene Verhalten abzubilden.


## Data Parameter
Angenommen es existiert ein Model `Category`:
``` ts
interface Category {
    id: number
    name: string
}
```
`Category` als Parameter zu übergeben bewirkt, dass nur Attribute des Interfaces in der Konfiguration erlaubt sind:
``` ts
const config: FilterSetConfig<Category> = {
    id: { 
        in: [1,2,3]
    }
}
```

### Nested Types
Nested-Types werden auch unterstützt:
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
Mit einer Key-Konfiguration ist es möglich zu spezifizieren welche Filter für eine Attribut erlaubt sind.
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
Diese Konfiguration erlaubt nur  `exact`, `startwith` und `endswith` für das Attribut `name`

::: tip
Attribute, die in der Key-Konnfiguration nicht erwähnt werden, erlauben weiterhin alle Filter.
Beachte, dass der `value`-Filter nicht ausgeschlossen werden kann.
:::

### Nested Types

Für Nested-Types wie folgt aussehen:
``` ts
interface BookKeyConfig {
    category : {
        name: 'exact' | 'startwith' | 'endswith'
    }
}
```
Das ist zwar etwas redundant, aber ermöglicht es, unterschiedliche Verhaltensweisen für die Modelle zu definieren.
Um den redundanten Teil zu entfernen, kann die Konfiguration auch folgendermaßen geschrieben werden:
``` ts
interface BookKeyConfig {
    category : CategoryKeyConfig
}
```

## Custom Filter
Custom-Filter können wie folgt definiert werden:
``` ts
interface CustomFilter {
  notIn: any[]
}
```
::: warning
Es gibt noch keine generische Type-Hints für benutzerdefinierte Filter.
Die Verwendung von `any` als Typ erlaubt die Verwendung des Filters überall, lockert aber auch die Typisierung des übergebenen Wertes.:::

Um die Type-Hints zu aktivieren, muss der Filter einer Schlüsselkonfiguration hinzugefügt werden.
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
