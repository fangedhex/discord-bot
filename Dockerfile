FROM node:alpine
ADD . /src
RUN cd /src && npm install && npm run lint && npm run build -- --dist /app && rm -rf /src

FROM fangedhex/base-images:node
RUN apt-get update && apt-get install -y --no-install-recommends --no-install-suggests ffmpeg && rm -rf /var/lib/apt/lists/*
COPY --from=0 /app /app
ENV DEBUG=bot:* NODE_ENV=production
