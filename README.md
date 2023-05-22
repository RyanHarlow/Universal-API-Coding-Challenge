# Universal API Coding Challenge

## API Documentation
API documentation can be found [here](https://app.swaggerhub.com/apis-docs/RYANHARLOW95_1/Universal-API-Coding-Challenge/1.0).

## Live Demo
API Live Demo is available at https://universal.ryanharlow.com/api/tracks/

### End point examples
Create track by isrc: POST https://universal.ryanharlow.com/api/tracks/USGF19942501

Retrieve track by isrc: GET https://universal.ryanharlow.com/api/tracks/USGF19942501

Search track by artist: GET https://universal.ryanharlow.com/api/tracks/?artist=nirvana

## Usage Demo
[Demo](https://drive.google.com/file/d/1CWr6Mkhjzl6NK3aRe0VkcYcNl2yMjqIf/view?usp=share_link)

## Installation

### Prerequisites
* node v18.7.0

* npm 8.18.0

* postgres 14.7


### Postgres installation and config
In order to run the app, we need to have postgres installed and running locally with a postgres user with the same username as our local linux user, and we need to have an empty database named "spotify"

1. `sudo apt install postgresql postgresql-contrib`

2. `sudo systemctl start postgresql.service`

3. `sudo -u postgres createuser --interactive`

4. Enter name of role to add: linuxUserName

5. Shall the new role be a superuser? (y/n) y

6. `createdb linuxusername`

7. `psql`

8. `CREATE DATABASE spotify;`

9. `\q`

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