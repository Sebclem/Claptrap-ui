FROM node:16 AS builder

WORKDIR /app

COPY package.json .
COPY yarn.lock .
COPY .yarn/releases/* .yarn/releases/
COPY .yarnrc.yml .
RUN yarn install

COPY . .

RUN yarn build

# nginx state for serving content
FROM nginx:alpine
# Set working directory to nginx asset directory
WORKDIR /usr/share/nginx/html
# Remove default nginx static assets
RUN rm -rf ./*
# Copy static assets from builder stage
COPY --from=builder /app/dist .
COPY nginx.conf /etc/nginx/conf.d/default.conf
# Containers run nginx with global directives and daemon off
ENTRYPOINT ["nginx", "-g", "daemon off;"]

LABEL \
  org.label-schema.name="Claptrap Bot" \
  org.label-schema.url="https://claptrapbot.com" \
  org.label-schema.vcs-url="https://github.com/Sebclem/Claptrap-ui" \
  org.label-schema.vendor="Sebclem"
