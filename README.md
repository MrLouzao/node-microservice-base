# node-microservice-base
Node microservice libraries scaffold


## Description

This repo contains the scaffold for:
- REST API (express)
- Spring Cloud Config integration


### Environment variables

You can run this application in two flavours: 

1. Using your own configuration.yaml file
2. Connecting to a Spring Cloud Config service


#### 1. Your own configuration

You can choose a file that contains all the related variables to startup.

- **PORT**: port in which the app is running. 6001 by default.
- **FILE**: specify the route of your yaml file


#### 2. Spring cloud config

This application requires the environment variables to obtain its configuration from a configuration service. Available vars are:

- **PORT**: port in which the app is running. 6001 by default.
- **CLOUD_CONFIG_URL**: configuration service url to obtain the configuration file.
- **ARTIFACT_ID**: ID for this application on configuration server.
- **APP_PROFILE**: profile to recover the proper config file. **Default**: development.


### Deploy with Docker

First compile your image:

```
$ npm run build-image
```

Then run the generated image:

```
$ docker run --rm -p 6001:6001 node-microservice-base:latest
```

If you want to run your image with another name, just change the build-image script on package.json
