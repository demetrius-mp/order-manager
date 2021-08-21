# fastapi-big-project-template

## Files structure
```
.
├── app
│   ├── crud
│   │   ├── __init__.py
│   │   ├── items.py
│   │   ├── order_items.py
│   │   └── orders.py
│   ├── dependencies.py
│   ├── entities
│   │   ├── database.py
│   │   ├── __init__.py
│   │   ├── models
│   │   │   ├── __init__.py
│   │   │   ├── item.py
│   │   │   ├── order_item.py
│   │   │   └── order.py
│   │   └── schemas
│   │       ├── __init__.py
│   │       ├── item.py
│   │       ├── order_item.py
│   │       └── order.py
│   ├── __init__.py
│   ├── main.py
│   └── routers
│       ├── __init__.py
│       ├── items.py
│       ├── order_items.py
│       └── orders.py
├── README.md
└── storage.db

6 directories, 23 files
```

## Files structure with comments

```
.
├── app                        # main application package
│   ├── __init__.py
│   ├── dependencies.py        # routers dependencies
│   ├── main.py                # main app
|   |
│   ├── crud                   # package with models CRUD
│   │   ├── __init__.py
│   │   ├── items.py           # model CRUD
│   │   ├── order_items.py     # model CRUD
│   │   └── orders.py          # model CRUD
|   |
│   ├── entities               # package with database and pydantic entities
│   │   ├── __init__.py
│   │   ├── database.py        # database configuration
|   |   |
│   │   ├── models             # package with database entities
│   │   │   ├── __init__.py    ### imports all database models for quick access
│   │   │   ├── item.py        # database model
│   │   │   ├── order_item.py  # database model
│   │   │   └── order.py       # database model
|   |   |
│   │   └── schemas            # package with pydantic entities
│   │       ├── __init__.py    ### imports all pydantic models for quick access
│   │       ├── item.py        # pydantic model
│   │       ├── order_item.py  # pydantic model
│   │       └── order.py       # pydantic model
|   |
│   └── routers                # package with routers
│       ├── __init__.py
│       ├── items.py           # router that manages item entity
│       ├── order_items.py     # router that manages order_item entity
│       └── orders.py          # router that manages order entity
|
├── README.md
└── storage.db

6 directories, 23 files
```

# How to add more entities
## 1. Database model
1. Create a file in the package _app/entities/models/_ representing your database model
2. Import your new model inside _app/entities/models/\_\_init\_\_.py_

## 2. Pydantic model
1. Create a file in the package _app/entities/schemas/_ representing your pydantic model
2. Import your new model inside _app/entities/schemas/\_\_init\_\_.py_

## 3. CRUD
1. Create a new file in the package _app/crud/_ representing your new model CRUD 

## 4. Router
1. Create a new file in the package _app/routers/_ with an APIRouter object
2. Create the routes of the new model using the APIRouter object

# How to add more dependencies
1. Create the dependency function in the file _dependencies.py_
