# Stage 1: Build the Angular application
FROM node:20 AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2: Serve the application with a Node.js server
FROM node:20
WORKDIR /app
COPY --from=build /app/dist/agent_framework_web /app/dist
COPY . .
RUN npm install --only=production

EXPOSE 8080
CMD ["node", "server.js"]
