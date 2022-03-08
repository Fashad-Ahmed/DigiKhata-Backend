FROM node:8-alpine

WORKDIR /app

ADD package.json /app/package.json
RUN npm config set registry http://registry.npmjs.org
RUN npm install

ADD . /app

EXPOSE 3000

CMD ["npm", "run", "start"]
# FROM node:14.17.0-alpine

# LABEL maintainer="dev@crowdlinker.com"

# # Create app directory
# WORKDIR /var/www/backend

# # Install app dependencies - For NPM use: `COPY package.json package-lock.lock ./`
# COPY package.json yarn.lock ./ 
# # For NPM use: `RUN npm ci`
# RUN yarn --pure-lockfile

# # Copy important files - Add ormconfig.ts here if using Typeorm
# COPY .eslintrc.js nest-cli.json tsconfig.json tsconfig.build.json ./

# # Copy env
# COPY .env.docker /var/www/backend/.env

# # Add storage folder to the container (If you want to add other folder contents to the container)
# # ADD storage /var/www/backend/storage

# # Entrypoint command - Replace `"yarn"` with `"npm", "run"` if you are using NPM as your package manager.
# # You can update this to run other NodeJS apps
# CMD [ "yarn", "start:dev", "--preserveWatchOutput" ]

# FROM node:12.19.0-alpine3.9 AS development

# WORKDIR /usr/src/app

# COPY package*.json ./

# RUN npm install glob rimraf

# RUN npm install --only=development

# COPY . .

# RUN npm run build

# FROM node:12.19.0-alpine3.9 as production

# ARG NODE_ENV=production
# ENV NODE_ENV=${NODE_ENV}

# WORKDIR /usr/src/app

# COPY package*.json ./

# RUN npm install --only=production

# COPY . .

# COPY --from=development /usr/src/app/dist ./dist

# CMD ["node", "dist/main"]