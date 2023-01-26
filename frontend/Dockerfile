# Using a Node 14 base image
FROM node:14-alpine AS build

# Set the working directory to /app inside the container
WORKDIR /app

# Coping
COPY src ./src
COPY public ./public
COPY package.json yarn.lock tsconfig.json ./
RUN yarn
COPY . ./
RUN yarn build

# Bundle static assets with nginx
FROM nginx:1.12-alpine

# Copy built assets from `builder` image
COPY --from=build app/build /usr/share/nginx/html

# Adding nginx.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose the port on which the app will be running (3000 is the default that `serve` uses)
EXPOSE 80

# Start the app
CMD ["nginx", "-g", "daemon off;"]
#CMD ["yarn", "start"]