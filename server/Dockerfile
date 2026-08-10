# Express API for the RichPort portfolio.
# Runs on ECS Fargate behind an ALB; CloudFront terminates TLS in front.
FROM node:22-alpine

# dumb-init gives us correct PID 1 signal handling, so ECS task drain
# actually stops the container instead of waiting out the 30s SIGKILL timer.
RUN apk add --no-cache dumb-init

WORKDIR /app

# Copy manifests first so `npm ci` is cached until dependencies actually change.
COPY package*.json ./
RUN npm ci --omit=dev && npm cache clean --force

COPY . .

# node:alpine ships an unprivileged `node` user — use it rather than root.
RUN chown -R node:node /app
USER node

# Matches the PORT env var set in the task definition.
EXPOSE 4000

ENTRYPOINT ["dumb-init", "--"]
CMD ["node", "index.js"]
