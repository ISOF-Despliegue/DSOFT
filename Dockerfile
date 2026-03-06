# Instalar dependencias de produccion
FROM node:22-alpine AS deps

WORKDIR /app

COPY package*.json ./
RUN npm ci --omit=dev --no-audit --fund=false && npm cache clean --force

# Runtime ligero
FROM node:22-alpine AS runner

WORKDIR /app

# Elimina npm/npx del runtime para reducir superficie y CVEs heredados.
RUN rm -rf /usr/local/lib/node_modules/npm \
  && rm -f /usr/local/bin/npm /usr/local/bin/npx

USER node

COPY --chown=node:node --from=deps /app/node_modules ./node_modules
COPY --chown=node:node src ./src

EXPOSE 3000

CMD ["node", "src/app.js"]
