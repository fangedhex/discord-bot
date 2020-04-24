FROM node:lts
# Install part
RUN apt-get update \
&& apt-get install -y --no-install-recommends --no-install-suggests build-essential ffmpeg \
&& rm -rf /var/lib/apt/lists/*
# Build part
ADD . /app
RUN cd /app \
&& npm install \
&& npm run build
ENV DEBUG=bot:* NODE_ENV=production
