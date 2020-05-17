#!/bin/bash

# Saifco Image Building

# Client Admin Image Name
export CLIENT_ADMIN_NAME=insperonbusiness/saifco:admin

# Client User Image Name
export CLIENT_USER_NAME=insperonbusiness/saifco:user

# Client Warehouse Image Name
export CLIENT_WAREHOUSE_NAME=insperonbusiness/saifco:warehouse

# Build Images
docker build -t $CLIENT_ADMIN_NAME --compress ./client-admin

docker build -t $CLIENT_USER_NAME --compress ./client-user

docker build -t $CLIENT_WAREHOUSE_NAME --compress ./client-warehouse

# Prune Dangling Images
docker image prune

# Logout from Current Docker Account
docker logout

# Login to Docker Account
docker login

# Push client images
docker push $CLIENT_ADMIN_NAME

docker push $CLIENT_USER_NAME

docker push $CLIENT_WAREHOUSE_NAME