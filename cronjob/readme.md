# Boleteria VIP olecram Daemon

Daemon application that periodically checks for new partner updates on Boleteria Vip and stores the changes in the database. It maintains a pointer to the last update and manages logs of all events.

## Table of Contents

- [Install on-premise](#install)
- [Enviropments](#env)
- [Setting Sheduling](#setting-sheduling)
- [Running manually from code](#deployd-run)
- [Generate deployd](#manually-deployd)

# Create image

    Construyendo la imagen desde un Dockerfile y, al mismo tiempo, asignándole un nombre y un tag (moviedomfo/docker-compose:1.0).
    
    docker build -t moviedomfo/olecram-daemon:2.0 

    docker-compose up -d
    docker-compose build --no-cache && docker-compose up -d
    docker-compose down && docker-compose build --no-cache && docker-compose up -d

## Install using PM2 as service management

    1.  Install PM2 on the on-premise server:

        npm install -g pm2

    2.  Create a new folder to host the server:

        %server_path%

    3.  Copy the 'dist' content inside the previously mentioned folder

         ./dist to   %server_path%/dist

    4.  Copy all filesToRelease folder content to %server_path%

        filesToRelease --> %server_path%

    5. Edit 'serviceStart_pm2.bat' to change the 'cd' command to point to %server_path%.

    6. in  %server_path% path run

       yarn install --production

    7- copy .env file and copy to %server_path%

      .env --> %server_path%/.env

<a name="env"></a>

## Enviropment

<a name="deployd-run"></a>

## Running manually from code

    - yarn prod  => to generate 'dist' whit builded files and start up the app

<a name="manually-deployd"></a>

## Generate deployd (dist folder)

- yarn build

  This comand will generate dist/bundle.js

<a name="#setting-sheduling"></a>

## Setting Sheduling

### Time Fields \* \* \* \* \*

- **Minute (0 - 59):** Indicates the minute when the command will be executed.
- **Hour (0 - 23):** Indicates the hour of the day when the command will be executed.
- **Day of the month (1 - 31):** Indicates the day of the month when the command will be executed.
- **Month (1 - 12):** Indicates the month of the year when the command will be executed.
- **Day of the week (0 - 7):** Indicates the day of the week when the command will be executed (0 and 7 both represent Sunday).

### Example

    //"*/1 10-17 * * *" | Every minute de 10 AM a 5 PM  (10 a 17)
    //"* 10-17 * * *"   | Every minute de 10 AM a 5 PM   (10 a 17)
    //"*/5 * * * *"     | Every 5 minutes
