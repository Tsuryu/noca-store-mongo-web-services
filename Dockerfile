FROM node

# Create app directory
WORKDIR /

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY ./server ./server
COPY ./public ./public

# App bind port
EXPOSE 3005

# Run app command on runtime
CMD [ "node", "server/server.js" ]