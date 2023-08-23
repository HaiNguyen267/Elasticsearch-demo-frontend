FROM node 

# Create app directory
WORKDIR /app

# Install app dependencies
COPY package.json /app

# Install dependencies
RUN npm install

# Bundle app source
COPY . /app

# Expose port 3000
EXPOSE 3000

# Run app
CMD ["npm", "start"]