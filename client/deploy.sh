#!/bin/bash

# Saifco Deployment Server

# Client Admin Image Name
export CLIENT_ADMIN_NAME=insperonbusiness/saifco:admin

# Client User Image Name
export CLIENT_USER_NAME=insperonbusiness/saifco:user

# Client Warehouse Image Name
export CLIENT_WAREHOUSE_NAME=insperonbusiness/saifco:warehouse


docker pull $CLIENT_ADMIN_NAME

docker pull $CLIENT_USER_NAME

docker pull $CLIENT_WAREHOUSE_NAME

docker run --name admin-app -dp 9000:80 $CLIENT_ADMIN_NAME

docker run --name user-app -dp 9001:80 $CLIENT_USER_NAME

docker run --name warehouse-app -dp 9002:80 $CLIENT_WAREHOUSE_NAME
