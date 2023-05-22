# Universal API Coding Challenge

## API Documentation
API documentation can be found [here](https://app.swaggerhub.com/apis-docs/RYANHARLOW95_1/Universal-API-Coding-Challenge/1.0).

## Installation

prerequisites
node v18.7.0
npm 8.18.0
postgres 14.7


### postgres installation and config
sudo apt install postgresql postgresql-contrib

sudo systemctl start postgresql.service

sudo -u postgres createuser --interactive

Enter name of role to add: linux username

Shall the new role be a superuser? (y/n) y

createdb sammy

psql

CREATE DATABASE spotify;

###  Installation

1. clone and cd into repo
* `git clone https://github.com/RyanHarlow/Universal-API-Coding-Challenge.git`
* `cd Universal-API-Coding-Challenge`
2. install dependencies
* `npm install`
3. setup environment variables
* `cp .env.example .env`
* `nano .env`
* edit the .env file with spotify api credentials and port
4. Run application
* `node index.js`