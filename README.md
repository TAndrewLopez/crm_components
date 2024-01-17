Setup local postgres database.

Install dependencies. Prisma is used in this project to connect to the database. If you choose to use a database other than postgresql, you'll need to update the datasource db in /prisma/schema.prisma file.


Seed database with data from csv

npx prisma db push
npx prisma generate

update file path for csv files for each /COPY command in sql statements.

npm run seed