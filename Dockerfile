# syntax=docker/dockerfile:1

FROM node:22-alpine AS build
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .

# Empty API URL = same-origin /api. On VPS use /profile-ai-api.
# VITE_BASE_PATH=/profile-ai-web/ when served behind global_nginx.
ARG VITE_API_URL=
ARG VITE_BASE_PATH=/
ENV VITE_API_URL=$VITE_API_URL
ENV VITE_BASE_PATH=$VITE_BASE_PATH

RUN npm run build

FROM nginx:1.28-alpine AS runtime

ENV NGINX_ENVSUBST_FILTER=API_UPSTREAM
ENV API_UPSTREAM=http://host.docker.internal:3000

COPY nginx/default.conf.template /etc/nginx/templates/default.conf.template
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
    CMD wget -qO- http://127.0.0.1/healthz || exit 1
