# Importer Challenge
## Overview

Following project is a small REST API consisting of 2 microservices using a common datastorage:
- 'write' microservice is importing csv file fo database
- 'read'  microservice gets data from the database using filters

Project is using Node.js with Typescript and Express framework, datastorage is a MongoDB database. Each microservice is runnning in its own Docker Container and connecting to the MongoDB container where the database is stored - following orhestration is described in docker-compose file in the root directory of the project.

## Folder Structure

```

├── read                    
│   └── src         
|       ├── database
|       ├── models
|       ├── routers
|       ├── test
|       └── app.ts
├── write                    
│   └── src         
|       ├── database
|       ├── models
|       ├── routes
|       ├── helpers
|       ├── test
|       └── app.ts
└── docker-compose.yml
```

Both microservices have similar folder structure - source typescript code is stored in folder src, javascript code will be compiled into folder dist/ of the same level. 

'helpers/' folder in 'write/src' contains small helper services for the import endpoint

## Getting started 

Steps to run project in docker:

1. Clone repository
2. Set environment varuables (APP_URL, PORT, MONGO_ADDRESS). Variables in .env.example are set for localhost in accordance with ports indicated in docker-compose file
3. Run following command to build, starts and attach to containers for a service:

``` 
docker-compose up -d
```

## Importing to Database with test

Import of the .csv file can be done through the following endpoint:
```
POST /emissions
```

To make initial import easier it can be done through a test written with Mocha and Chai libraries:

In write/ directory:

1. installing dependencies:
```
npm install
```

2. compling typescript:
```
tsc
```

3. running test:

```
npm run test
```

expected output:

```
  Emissions
    /POST emissions
http://localhost:3000
      ✔ it should save emissions.csv to database (115775ms)


  1 passing (2m)
```


## Read endpoints and filter

GET /emissions

optional query params for filtering:

```
coutry         string     example: ABW
sector         string  	  example: Agriculture
parentSector   string     example: Total+including+LULUCF
year           string     example: 1850
```

Request example:

```
GET  /emissions?country=ABW&year=1850&sector=Industrial+process

Response body:

[
    {
        "_id": "6130c8accd3a8f0020d0255f",
        "country": "ABW",
        "sector": "Industrial process",
        "parentSector": "Total including LULUCF",
        "year": "1850",
        "value": 0,
        "__v": 0
    },
    {
        "_id": "6130c8decd3a8f0020d64976",
        "country": "ABW",
        "sector": "Industrial process",
        "parentSector": "Total including LULUCF",
        "year": "1850",
        "value": 0,
        "__v": 0
    }
]
```
Query param years can also be put as array by repeating param in query in case data needs to be recieved for various years:

```
GET  /emissions?country=ABW&year=1850&year=1851&sector=Industrial+process

Response body:

[
    {
        "_id": "6130c8accd3a8f0020d0255f",
        "country": "ABW",
        "sector": "Industrial process",
        "parentSector": "Total including LULUCF",
        "year": "1850",
        "value": 0,
        "__v": 0
    },
    {
        "_id": "6130c8decd3a8f0020d64976",
        "country": "ABW",
        "sector": "Industrial process",
        "parentSector": "Total including LULUCF",
        "year": "1850",
        "value": 0,
        "__v": 0
    },
    {
        "_id": "6130c8accd3a8f0020d02560",
        "country": "ABW",
        "sector": "Industrial process",
        "parentSector": "Total including LULUCF",
        "year": "1851",
        "value": 0,
        "__v": 0
    },
    {
        "_id": "6130c8decd3a8f0020d64977",
        "country": "ABW",
        "sector": "Industrial process",
        "parentSector": "Total including LULUCF",
        "year": "1851",
        "value": 0,
        "__v": 0
    }
]
```