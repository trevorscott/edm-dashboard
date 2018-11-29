# edm-dashboard

React app that displays messages from your `edm` kafka cluster. Messages are streamed to the dashboard using [socket.io](https://socket.io/).

This app is part of a group of apps that all must be deployed in a particular order:

1. [edm-relay](https://github.com/trevorscott/edm-relay)
1. [edm-stream](https://github.com/trevorscott/edm-stream)
1. [edm-stats](https://github.com/trevorscott/edm-stats)
1. [edm-ui](https://github.com/trevorscott/edm-ui)
1. [edm-dashboard](https://github.com/trevorscott/edm-dashboard)

![Event Driven Microservices with Apache Kafka on Heroku Demo Architecture](https://s3.amazonaws.com/octo-public/kafka-microservices.png "EDM")

## Terraform Deploy

To deploy this entire demo with a single command see [edm-terraform](https://github.com/trevorscott/edm-terraform).

# Setup

```
git clone git@github.com:trevorscott/edm-dashboard.git && cd edm-dashboard
heroku create $appName
heroku buildpacks:set mars/create-react-app
```

## config

You should have deployed `edm-stream`. You will need to set the following config var with its hostname.

e.g if your `edm-stream` app name was `my-stream` you may set this config var as `https://my-stream.herokuapp.com`.

```
heroku config:set REACT_APP_EDM_STREAM_BACKEND_HOST="https://<edm-stream-appName>.herokuapp.com"
heroku config:set REACT_APP_EDM_STATS_BACKEND_HOST="https://<edm-stats-appName>.herokuapp.com"
```


## Deploy
```
git push heroku master
```

## Scale Up

Scale up your service to avoid sleeping dynos.

```
heroku ps:scale web=1:standard-1x
```

## Local Dev

### .env

By default create-react-app runs on port 3000. Since we have two create-react-apps running simultaneously we will run into a conflict. To avoid conflict create a .env file in the root of the project and add a single line into it:

```
PORT=3001
```

### Run

```
npm install
npm start
```
