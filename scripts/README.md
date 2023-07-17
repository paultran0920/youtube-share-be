# Precondition

## Install typeorm cli
Please follow this document to [install the typeorm CLI](https://typeorm.io/using-cli#installing-cli) 
or just do this

`npm i -g typeorm`

## Create Database
If running from this docker configuration so let bypass this part.

Otherwise please create database for youtube share app, use utf8mb4 charset for unicode characters as following sample
```sql
CREATE DATABASE `youtube-share-db` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
```

## Root path
Assume that you will run the following commands from the root folder of `youtube-share-be` project

# Database Migration
## Create datasource
You need to create/modify a datasource file similar to [datasource.ts](datasource.ts)

## Create migration
Run this command to create new migration script file
```sh
typeorm migration:create ./scripts/<script name>
```

For example
```sh
typeorm migration:create ./scripts/create-tables
```

The output should be
```sh
./scripts/1689518313994-create-tables.ts
```

## Run migration
This command will connect to database as configured in the datasource file and run all migrations scripts that specified in the `migrations` field.

Only the new scripts with the timestamp is later than the last run timestamp from the `migrations` table will be run.

Execute this command from root of project will start data migration proccess

```sh
npm run typeorm migration:run -- -d ./scripts/datasource.ts 
```
