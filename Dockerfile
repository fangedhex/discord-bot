FROM node:alpine
ADD . /src
ENV DEBUG=bot,*-provider NODE_ENV=production
RUN cd /src && npm run build -- --dist /app && rm -rf /src
WORKDIR /app
CMD ["node", "index.js"]
