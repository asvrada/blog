---
date: '2020-05-03'
title: Some note on Dockerize React.js project
category: note
---

## Why copy package.json first in Dockerfile

> Source: https://nodejs.org/fr/docs/guides/nodejs-docker-webapp/

> Note that, rather than copying the entire working directory, we are only copying the package.json file. This allows us to take advantage of cached Docker layers.

## How to use cached layer in Docker to accelerate build

For a frontend project, do as mentioned above. The key is to ignore files like `.idea` in `.dockerignore` that would often change unexpectedly.

For example: the Dockerfile for my project and the `.dockerignore` file

```
# First
FROM node as builder

COPY package.json yarn.lock /app/

WORKDIR /app/

RUN yarn install --frozen-lockfile

COPY . /app/

RUN yarn run build

# Second
FROM nginx

COPY --from=builder /app/build /usr/share/nginx/html
COPY ci/nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

# Deamon off to tell nginx to run at foreground
ENTRYPOINT ["nginx", "-g", "daemon off;"]
```

```
.DS_Store
.git
.gitignore
.idea

build
node_modules
```

## Why yarn.lock

This file is used to specify the exact version of library used in your project.

Yes we have `package.json`, but the version specified in that file is usually a range of possible version to download, like `"node-sass": "^4.13.1"`, see below link for detailed explanation on `^`(caret) and `~`(tilde)

> https://stackoverflow.com/a/22345808/5303092

So yarn use `yarn.lock` to further store the exact version number used.

> https://classic.yarnpkg.com/en/docs/yarn-lock/

## warning has unmet peer dependency

You may have seen this when `yarn upgrade`, what is these, why is this here, and should I care?

### What's peer dependency

> https://nodejs.org/es/blog/npm/peer-dependencies/  
> https://indepth.dev/npm-peer-dependencies/

### Why is this warning here

These peer dependency of the package you use is not installed (i.e, not in your `package.json`'s dependency)

### Should I care / Should I fix the warning

This is something I don't really know after searching online and no answers found. Right now, if my build is successful, I don't really care.
