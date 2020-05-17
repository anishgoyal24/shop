### STAGE 1: Build ###

# We label our stage as ‘admin’
FROM mhart/alpine-node:12 as admin

# Adding Label
LABEL stage=admin

# Defining Workdir
WORKDIR /usr/app/public/admin

# Copy package.json
COPY ./client-admin/package.json ./

## Installing and storing node modules on a separate layer will prevent unnecessary npm installs at each build
RUN npm install

# Copy all the files
COPY ./client-admin ./

## Build the angular app in production mode and store the artifacts in dist folder
RUN npm run prod

### STAGE 2: Build ###

# We label our stage as ‘user’
FROM mhart/alpine-node:12 as user

# Adding Label
LABEL stage=user

# Defining Workdir
WORKDIR /usr/app/public/user

# Copy package.json
COPY ./client-user/package.json ./

## Installing and storing node modules on a separate layer will prevent unnecessary npm installs at each build
RUN npm install

# Copy all the files
COPY ./client-user ./

## Build the angular app in production mode and store the artifacts in dist folder
RUN npm run prod

### STAGE 3: Build ###

# We label our stage as ‘warehouse’
FROM mhart/alpine-node:12 as warehouse

# Adding Label
LABEL stage=warehouse

# Defining Workdir
WORKDIR /usr/app/public/warehouse

# Copy package.json
COPY ./client-warehouse/package.json ./

## Installing and storing node modules on a separate layer will prevent unnecessary npm installs at each build
RUN npm install

# Copy all the files
COPY ./client-warehouse ./

## Build the angular app in production mode and store the artifacts in dist folder
RUN npm run prod

# ### STAGE 4: Setup ###

# We label our stage as ‘client’
FROM mhart/alpine-node:12 as client

# Adding Label
LABEL stage=client

# Create app directory
WORKDIR /app

# Copy package.json to the WORKDIR
COPY ./package.json ./

# Install dependencies
RUN npm install

# Copy all the files from local folder to the container WORKDIR
COPY ./ ./


## From ‘admin’ stage copy over the artifacts in dist folder to default nginx public folder
COPY --from=admin /usr/app/public/admin/dist /app/public/admin

## From ‘user’ stage copy over the artifacts in dist folder to default nginx public folder
COPY --from=user /usr/app/public/user/dist /app/public/user

## From ‘warehouse’ stage copy over the artifacts in dist folder to default nginx public folder
COPY --from=warehouse /usr/app/public/warehouse/dist /app/public/warehouse

# Removing the client apps 
RUN rm -rf /usr/app/client-admin /usr/app/client-user /usr/app/client-warehouse

# Expose the port
EXPOSE 3000

# Start the Server
CMD ["npm", "run", "start"]

