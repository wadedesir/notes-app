FROM node:18-bullseye
WORKDIR /usr/src/app
COPY package*.json .
RUN npm ci
COPY . .
CMD ["npm", "run", "dev"]

curl -H 'Content-Type: application/json' \
      -d "{ 'prompt': 'I need to be happy tomorrow'"\
      -X POST \
      http://localhost:8420/v1/gpt'