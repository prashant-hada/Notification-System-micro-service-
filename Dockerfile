FROM node:16

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of this app's code
COPY . .

# Expose the port this app will run on 
EXPOSE 3000

# Set the command to run this application using PM2
CMD ["pm2-runtime", "ecosystem.config.js"]
