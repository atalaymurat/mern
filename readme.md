## Docker MERN Stack for app

express backend
mongo database Atlas
react-app frontend

run
  docker compose up --build

This runs only server side is not running frontend
front end can be run from mern/frontend
npm start or npm run dev
listening on port 3001


check all the env files for production 
mern level .env file is for docker-compose
frontend .env and .env.production for server and local
express .env file for production and local also chnge NODE_ENV to production on server manually 

env express add your domains for cors list to allow 