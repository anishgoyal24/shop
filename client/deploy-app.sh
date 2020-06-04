#!/bin/bash

# Saifco Server Deployment

# Client Admin Image Name
export CLIENT_ADMIN_NAME=amasia:admin

# Client User Image Name
export CLIENT_USER_NAME=amasia:user

# Client Warehouse Image Name
export CLIENT_WAREHOUSE_NAME=amasia:warehouse

# Main App Image Name
export MAIN_APP_IMAGE_NAME=amasia:main-app

# Orders App Image Name
export ORDERS_APP_IMAGE_NAME=amasia:orders-app

# Orders App Image Name
export UPLOADS_APP_IMAGE_NAME=amasia:uploads

ssh -p 22 root@35.185.176.55

docker volume create mysql-data

docker volume create uploads

docker network rm saifco

docker network create saifco

docker run -p 3306:3306 --network saifco --name mysql -v mysql-data:/var/lib/mysql -d=true -e MYSQL_ROOT_PASSWORD=saifco mysql:5.7

docker exec -it mysql /bin/bash

mysql -u root -p

create database saifco

CREATE USER 'admin'@'%' IDENTIFIED BY 'admin'

GRANT ALL PRIVILEGES ON . TO 'admin'@'%'

docker pull $MAIN_APP_IMAGE_NAME

docker pull $ORDERS_APP_IMAGE_NAME

docker pull $CLIENT_ADMIN_NAME

docker pull $CLIENT_USER_NAME

docker pull $CLIENT_WAREHOUSE_NAME

docker run  --name main-app -d=true --network saifco -p 8082:8082 $MAIN_APP_IMAGE_NAME

docker run  --name orders-app -d=true --network saifco -p 8081:8081 $ORDERS_APP_IMAGE_NAME

docker run --name admin-app --network saifco -dp 9000:80 $CLIENT_ADMIN_NAME

docker run --name user-app --network saifco -dp 9001:80 $CLIENT_USER_NAME

docker run --name warehouse-app --network saifco -dp 9002:80 $CLIENT_WAREHOUSE_NAME

docker run  --name uploads-server -d=true --network saifco -v uploads -p 4000:4000 insperonbusiness/saifco:

docker run -d \
  --name watchtower \
  -v /home/root/.docker/config.json:/config.json \
  -v /var/run/docker.sock:/var/run/docker.sock \
  v2tec/watchtower container_to_watch --debug