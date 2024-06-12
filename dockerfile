# Start from Node base image
FROM node:18 as builder

WORKDIR /app
COPY package*.json ./
RUN npm install --silent
COPY . ./
RUN npm run build

# Start NGINX using the official Docker image
FROM nginx:latest

# Copy built app from previous stage into NGINX root dir
COPY --from=builder /app/build /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
