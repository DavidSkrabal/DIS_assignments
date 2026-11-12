# actual image of Node.js
FROM node:20-alpine
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm install

# Copy the rest of the application code into the container
COPY . .
# Export the port that the Vite development server will run on
EXPOSE 5173
CMD ["npm", "run", "dev", "--", "--host"]