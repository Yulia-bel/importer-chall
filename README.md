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

## Getting started and Importing to Database with test

Steps to run project in docker:

1. Clone repository
2. Run the command to execute go.sh bash script:

```
sh go.sh
```

The go.sh contains two commands which will run one after another:

*docker-compose up -d*  - to build and start container

*docker run --network emissions_default --name write-api-test --rm --env API_URL=docker-write --env PORT=3000 emissions_write-api npm run test*  - to create and remove after - a container to run the 'write-api' test and import csv to database


expected output:

```
Creating network "emissions_default" with the default driver
Creating docker-read  ... done
Creating mongo        ... done
Creating docker-write ... done

> write@1.0.0 test
> mocha 'dist/test' --timeout 10000000

docker-write:3000


  Emissions
    /POST emissions
null
      ✔ it should save emissions.csv to database (108137ms)


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