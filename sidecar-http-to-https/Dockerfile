FROM node:24-alpine
LABEL maintainer="piyush verma"
WORKDIR /app
COPY . .
RUN npm install
CMD ["npm", "run", "start"]
EXPOSE 8081