FROM node:10.13.0-alpine
# Create Directory for the Container
WORKDIR /usr/src/app
# Only copy the package.json file to work directory
COPY package.json .
# Install all Packages
RUN yarn
# Copy all other source code to work directory
# TypeScript
ADD . /usr/src/app
RUN yarn run tsc
# Start
EXPOSE 3006
CMD [ "node", "build/index.js" ]

# docker-compose up --build run that to start container