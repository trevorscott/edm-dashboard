# edm-dashboard

React app that displays messages from your `edm` kafka cluster. Messages are streamed to the dashboard using socket.io.

# Setup

```
git clone git@github.com:trevorscott/edm-dashboard.git && cd edm-dashboard
heroku create $app_name
heroku buildpacks:set mars/create-react-app
```

## config

You should have deployed `edm-stream`. You will need to set the following config var with its hostname.

e.g if your `edm-stream` app name was `my-stream` you may set this config var as `https://my-stream.herokuapp.com`.

```
heroku config:set REACT_APP_EDM_STREAM_BACKEND_HOST=<edm-stream-hostname>
```

## Deploy
```
git push heroku master
```
