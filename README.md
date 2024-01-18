# Developer Instructions

## Clone Repo & Install Dependencies
```
npm run i
```

## Setup local Postgresql database.
Prisma is used in this project to connect to the database so if you choose to use a database other than postgresql, you'll need to update the datasource db in /prisma/schema.prisma file.

```
npm run i
npm run reset
```

Two things require an update before seeding the database. One: Update the file path for each csv file in sql /copy statements. Second (assuming you're using postgres): Create a seed command in package.json file. 

```
psql -U username -d db_name < path/to/init.sql
```
Then run seed file.

```
npm run seed
```

## Run Application
```
npm run dev
```