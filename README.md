## Simple authentication API
This API feature a simple authentication proceess using modern technologies available in 2023. 

![FlowChart](https://raw.githubusercontent.com/ddiasfront/nestjs-graphql-prisma-mysql/master/repoimages/flowchart.png)

<a href="https://www.icloud.com/iclouddrive/0f4ypqpz3BnkZvNCy35lXj-4Q#flowchart">View full diagram</a>

#

## The API contain the following functionalities:

* Create user
* Retrieve user by id
* Retrieve user by name and email
* Retrieve all users
* Delete user
* Sign in user

#

## Validations

* It validates if the user exists before insert on the database
* It validates also if an email is valid/exists via a third party api
* It uses bcrypt for encryption and hashing password

#



### Built With

![Typescript][typescript-shield]
![Prisma][prisma-shield]
![MYSQL][mysql-shield]
![GraphQL][graphql-shield]
![NestJS][nestjs-shield]
![JWT][jwt-shield]
![Jest][jest-shield]
![ApolloGraphQL][apollo-shield]
![NodejS][nodejs-shield]

#

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```


<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[typescript-shield]: https://img.shields.io/badge/typescript-20232A?style=for-the-badge&logo=typescript&logoColor=61DAFB
[prisma-shield]: https://img.shields.io/badge/prisma-20232A?style=for-the-badge&logo=prisma&logoColor=61DAFB
[mysql-shield]: https://img.shields.io/badge/mysql-20232A?style=for-the-badge&logo=mysql&logoColor=61DAFB
[graphql-shield]: https://img.shields.io/badge/graphql-20232A?style=for-the-badge&logo=graphql&logoColor=61DAFB
[nestjs-shield]: https://img.shields.io/badge/nestjs-20232A?style=for-the-badge&logo=nestjs&logoColor=61DAFB
[jwt-shield]: https://img.shields.io/badge/JWT-20232A?style=for-the-badge&logo=JSON%20web%20tokens&logoColor=61DAFB
[jest-shield]: https://img.shields.io/badge/jest-20232A?style=for-the-badge&logo=jest&logoColor=61DAFB
[apollo-shield]: https://img.shields.io/badge/apollo-20232A?style=for-the-badge&logo=apollographql&logoColor=61DAFB
[nodejs-shield]: https://img.shields.io/badge/nodejs-20232A?style=for-the-badge&logo=node.js&logoColor=61DAFB

<p align="right">(<a href="#readme-top">back to top</a>)</p>
