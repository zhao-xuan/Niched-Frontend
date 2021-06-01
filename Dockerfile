# develop stage
FROM node:12.2.0-alpine as develop-stage
WORKDIR /app
#add /app/node_modules/.bin to $PATH
ENV PATH /app/node_modules/ .bin:$PATH 
COPY package*.json .
RUN yarn
RUN yarn global add @vue/cli
COPY . .
# build stage
FROM develop-stage as build-stage
RUN yarn build
# production stage
FROM nginx:1.16.0-alpine as production-stage
COPY --from=build-stage /app/dist /usr/share/nginx/html
# for vue router 
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/conf.d
EXPOSE 80
RUN iptables -A PREROUTING -t nat -p tcp --dport 80 -j REDIRECT --to-port 8080
CMD ["nginx", "-g", "daemon off;"]