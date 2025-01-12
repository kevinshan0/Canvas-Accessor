# Use an official lightweight Node.js image
FROM node:16-alpine

# Create app directory
WORKDIR /app

# Copy package files and install
COPY package*.json ./
RUN npm install

# Copy the rest of your app
COPY . .

# Build your app for production
RUN npm run build

# Expose port 3000 (SvelteKit preview runs here by default if you do `npm run preview`)
EXPOSE 3000

# Start the app
CMD ["npm", "run", "preview"]
