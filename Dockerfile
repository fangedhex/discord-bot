FROM fangedhex/base-images:node
RUN apt-get update && apt-get install -y --no-install-recommends --no-install-suggests ffmpeg && rm -rf /var/lib/apt/lists/*
ADD . /src
RUN cd /src && npm install && npm run build -- --dist /app && rm -rf /src
ENV DEBUG=bot:* NODE_ENV=production
