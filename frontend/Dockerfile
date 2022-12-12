FROM node:14-alpine AS build
WORKDIR /app
COPY src ./src
COPY public ./public
COPY package.json yarn.lock tsconfig.json ./
RUN yarn
COPY . ./
RUN yarn build

FROM nginx:1.12-alpine
COPY --from=build app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]