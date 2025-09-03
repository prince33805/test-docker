FROM node:20-slim

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy all source code
COPY . .

EXPOSE 3001

# Run dev server
CMD ["npm", "run", "dev"]
