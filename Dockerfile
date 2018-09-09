FROM node:8.11

# Create app directory
ENV INSTALL_PATH /link
RUN mkdir -p ${INSTALL_PATH}

COPY package.json package.json
COPY package-lock.json package-lock.json
RUN npm install

# Bundle app source
COPY . .
RUN ["npm", "run", "build"]

CMD ["npm", "start"]