FROM node:alpine
ADD . /src
RUN cd /src && npm install && npm run build -- --dist /app && rm -rf /src
ENV DEBUG=bot:* NODE_ENV=production
WORKDIR /app
CMD ["node", "index.js"]
