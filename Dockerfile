FROM node:alpine
WORKDIR /app
ADD . .
ENV DEBUG=bot,*-provider NODE_ENV=production
RUN npm install
CMD ["node", "index.js"]
