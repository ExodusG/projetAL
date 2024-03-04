###################
# BUILD FOR LOCAL DEVELOPMENT
###################
FROM node:18-alpine AS development
WORKDIR /app/client
COPY ./package.json ./
RUN npm install
RUN npm install -g @angular/cli
COPY . .
CMD ["ng","serve","--host","0.0.0.0", "--disableHostCheck=true", "--poll", "100"]

