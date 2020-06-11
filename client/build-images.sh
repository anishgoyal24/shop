#!/bin/bash

# amasia Image Building

# Client Admin Image Name
export CLIENT_ADMIN_NAME=amasia/shop:admin

# Client User Image Name
export CLIENT_USER_NAME=amasia/shop:user

# Client Warehouse Image Name
export CLIENT_WAREHOUSE_NAME=amasia/shop:warehouse

# Emailing server Image name
export NOTIFICATIONS_NAME=amasia/shop:notifications

# Uploads server Image name
export UPLOADS_NAME=amasia/shop:uploads-app

# Build Images
docker build -t $CLIENT_ADMIN_NAME --compress ./client-admin

docker build -t $CLIENT_USER_NAME --compress ./client-user

docker build -t $CLIENT_WAREHOUSE_NAME --compress ./client-warehouse

docker build -t $NOTIFICATIONS_NAME --compress ../notifications/server/

docker build -t $UPLOADS_NAME --compress ../../uploads-service/


# Prune Dangling Images
docker image prune -f

# Logout from Current Docker Account
docker logout

# Login to Docker Account
docker login

# Push client images
docker push $CLIENT_ADMIN_NAME

docker push $CLIENT_USER_NAME

docker push $CLIENT_WAREHOUSE_NAME

docker push $NOTIFICATIONS_NAME

docker push $UPLOADS_NAME