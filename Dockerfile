FROM node:alpine AS build
ADD . /
RUN npm install && npm run lint && npm run build -- --dist /app && rm -rf /src

FROM jrottenberg/ffmpeg:4.1-scratch AS ffmpeg

FROM fangedhex/base-images:node
# Copy ffmpeg dep from a scratch image
COPY --from=ffmpeg / /
COPY --from=build /app /app
ENV DEBUG=bot:* NODE_ENV=production
