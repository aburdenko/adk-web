# Stage 1: Build the Angular application
FROM node:20 AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2: Serve the application from a lightweight web server
FROM nginx:alpine
COPY --from=build /app/dist/agent_framework_web /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
