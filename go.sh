#!/bin/bash

docker-compose up -d

docker run --network importer-challenge_default --name write-api-test --rm --env API_URL=docker-write --env PORT=3000 emissions_write-api npm run test 