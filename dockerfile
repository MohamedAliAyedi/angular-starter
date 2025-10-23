FROM node:latest AS build

WORKDIR /usr/local/app

COPY package*.json ./
COPY yarn.lock ./
RUN yarn install

COPY . .

ARG CONFIGURATION development

RUN npm run build -- --configuration ${CONFIGURATION}

FROM nginx:latest

COPY --from=build /usr/local/app/dist/zc-tia-bo/browser /usr/share/nginx/html
COPY ./deploy/nginx.conf /etc/nginx/conf.d/default.conf
# Expose port 80
EXPOSE 80

# Run Nginx
CMD ["nginx", "-g", "daemon off;"]
