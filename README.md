# edm-dashboard

React app that displays messages from your `edm` kafka cluster. Messages are streamed to the dashboard using socket.io.

# Setup

```
git clone git@github.com:trevorscott/edm-dashboard.git && cd edm-dashboard
heroku create $app_name
heroku config:set EDM_STREAM_BACKEND_HOST=<edm-stream-hostname>
heroku buildpacks:set mars/create-react-app
git push heroku master
```
