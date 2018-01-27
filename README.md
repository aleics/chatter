# chatter

[![Build Status](https://api.travis-ci.org/aleics/chatter.svg?branch=develop)](https://travis-ci.org/aleics/chatter)

An easy implementation of a chat using Angular and Go.

![Chat screenshot](/images/screenshot.png)


## deploy
Create docker image for server:
```
docker build -t chatter-server .
```
Create docker image for web:
```
docker build -t chatter-web .
```
Deploy containers:
```
docker-compose up -d
```

You can also use the docker-build.sh script.