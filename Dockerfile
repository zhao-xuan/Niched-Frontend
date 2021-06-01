# develop stage
FROM node:12.2.0-alpine as develop-stage
WORKDIR /app
ENV PORT=80
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
COPY nginx/nginx.conf /etc/nginx/conf.template
# COPY default.conf.template /etc/nginx/conf.d/default.conf.template
RUN /bin/sh -c "envsubst '\$PORT' < /etc/nginx/conf.template > /etc/nginx/conf.d/default.conf" 
RUN echo "==========================================================================="
RUN echo $PORT
CMD ["nginx", "-g", "daemon off;"]
