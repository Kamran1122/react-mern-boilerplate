## What is react-mern-boilerplate?
It is another MERN boilerplate that allows you to start a project right a way.

It already includes registration, JWT Login, JWT refresh, password-reset hooked up so you can get started right away.

Auto-login on browser refresh, and auto JWT refresh if the user is active. So user does not get logged out randomly.

On the frontend it provides components to protect routes when a user is authorized or unauthorized.

## Installation
- `npm i`
- create an .env file  in the root dir and add required vars. See the env section in the documentation.

## What is react-mern-boilerplate?

It is an opinionated starter repo for a react project using

**Database**
- [x] Mongoose

**View**
- [x] React + Redux

**Backend**
- [x] NodeJS

**Authentication**
- [ ] Facebook
- [ ] Google
- [ ] Twitter
- [x] Email

**Deployment**
- [ ] S3

## Installation 
`npm run i`

## Testing

**Client tests**
`npm run test-client` - Runs the client tests using jest

**Backend tests**
`npm run test-server` - Runs the backend tests using mocha

## Running the project

**Dev**
`npm run dev` - Starts the dev server

**Prod**
`npm run prod` - Builds and starts prod version of the project

## Env vars

\# Tokens
export JWT_TOKEN_SECRET_KEY=secret-key-to-sign-tokens

\# Nodemailer
export GMAIL_EMAIL=webdeveloperpr@gmail.com
export GMAIL_PASSWORD=123qweQWE
export EMAIL_SERVICE=gmail

