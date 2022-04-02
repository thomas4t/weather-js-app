# Weather app - built with react, redux & sagas

Weather forecast project. <br />
Project has been built as a sample for Bachelor thesis <br />
Tomáš Trávníček @ UHK 2022

## How to run

Get valid openweathermap.org API KEY - needed in .env

1. With docker

```
<root>cp .env-example .env
<root>/docker-compose up
```

App starts on `http://localhost/`

2. Razzle

```
<root>cp .env-example ./frontend/.env
<root>/frontend/yarn
<root>/frontend/yarn dev
```

App starts on `http://localhost:3000/`

## Based on awesome [Grab a plate from INVENTI & Adam Bisek](https://grab-a-plate-docz.netlify.app/)
