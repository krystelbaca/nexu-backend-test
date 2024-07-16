# Nexu Backend Coding Exercise
This project is a backend API for managing brands and their models. The API is built with Node.js and Express, and it uses MongoDB as the database.

## API description

### Brands

#### GET /brands

List all brands 
Response example:
```json
[
	{
		"id": "6695c4c8726f7c1cf0bf0ec7",
		"name": "Audi",
		"average_price": 630759
	},
	{
		"id": "6695c4c8726f7c1cf0bf0ec9",
		"name": "BMW",
		"average_price": 858702
	},
]
```

#### GET /brands/:id/models

List all models of the brand
Path param: 
```id: brandId``` 

Response example:
```json
[
{
		"id": 1,
		"name": "ILX",
		"average_price": 303176
	},
	{
		"id": 2,
		"name": "MDX",
		"average_price": 448193
	},
	{
		"id": 3,
		"name": "RDX",
		"average_price": 395753
	}
]
```

#### POST /brands

You may add new brands. A brand name must be unique.
Body:
```json
{"name": "Toyota"}
```
Response example:

```json
{
	"name": "Random new brand",
	"_id": "6695c2a74d6d33295b300691"
}
```

If brand exists:

```json
{
	"message": "Error creating a new brand"
}
```

#### POST /brands/:id/models

You may add new models to a brand. A model name must be unique inside a brand.
Path Param:
```
id: brand_id
```

Body:
```json
{
	"name": "A new model",
	"average_price": "200000"
}
```
Response example:
```json
{
	"model": "A new model",
	"averagePrice": 200000,
	"brand": "6696a5e20a75da5959be9475",
	"_id": "6696c94589610d3930dc1d74"
}
```
### Models

#### PUT /models/:id

Path param:
```
id: 7
```
You may edit the average price of a model.

Body

```json
{"average_price": 270000}
```
The average_price must be greater then 100,000.

Response example:
```json
{
	"_id": "6695c4c8726f7c1cf0bf0f0a",
	"id": 7,
	"model": "A1",
	"averagePrice": 270000,
	"brand": "6695c4c8726f7c1cf0bf0ec7"
}
```

#### GET /models?greater=&lower=

List all models. 
If greater param is included show all models with average_price greater than the param
If lower param is included show all models with average_price lower than the param

Query params:
```
greater: 800000

lower: 1000000
```
Response example:
```json
[
{
		"id": 54,
		"name": "X6",
		"average_price": 898716
	},
	{
		"id": 162,
		"name": "QX80",
		"average_price": 951850
	},
	{
		"id": 175,
		"name": "Defender",
		"average_price": 923797
	},
	{
		"id": 269,
		"name": "Cayenne",
		"average_price": 941314
	}
]
```

## Setup Instructions

### Prerequisites

- Node.js (v12 or higher)
- npm (v6 or higher)
- MongoDB

#### Run the project
1. Install dependencies:
```           npm install ```

2. Seed the database:
``` npm run seed```

3. Start the server:
```npm start ```
The server will start on the port 3002

4. Test:
```npm test```

### Directory Structure
```
nexu-backend-test/
├── src/        
│   ├── controllers/
│   │   ├── BrandController.js 
│   │   └── ModelController.js
│   ├── data/
│   │   └── seeder.js
│   │   └── models.json
│   ├── models/
│   │   ├── Brand.js        
│   │   └── Model.js  
│   ├── services/
│   │   ├── BrandService.js  
│   │   └── ModelService.js
│   ├── test/
│   │   ├── BrandController.test.js  
│   │   └── ModelController.test.js   
│   └── App.js
|   └── Router.js               
├── .gitignore
├── jest.config.js
├── package.json             
└── README.md                
```
### Comments | Observations
1. EL JSON con la data, podiamos omitir el ID de los elementos, ya que al trabajar en una base de datos tanto relacional como no relacional, genera estos ids.

##### To improve
1. Por cuestiones prácticas, hice un sólo routeador, sin embargo al crecer, lo mejor sería separar las rutas por módulo (Models, Brands, etc)
2. La configuración de ESLint, pude haberla hecho primero y no al final.
3. Agregar más test para los servicios.


##### Author:
Krystel Baca