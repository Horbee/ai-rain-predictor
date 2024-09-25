FROM node:lts-alpine AS client_build

RUN corepack enable

WORKDIR /app

COPY ./client/package.json ./client/pnpm-lock.yaml ./

RUN pnpm install --frozen-lockfile

COPY ./client .

RUN pnpm build

FROM python:3.11.5-slim-bullseye AS server_build

WORKDIR /app

COPY requirements.txt .

RUN pip install --no-cache-dir -r requirements.txt && \
    apt-get update && \
    apt-get install -y --no-install-recommends gcc && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

COPY . .
COPY --from=client_build /app/dist /app/client/dist

FROM python:3.11.5-slim-bullseye

WORKDIR /app

COPY --from=server_build /usr/local/lib/python3.11/site-packages /usr/local/lib/python3.11/site-packages
COPY --from=server_build /app /app

ENV PORT=8000
ENV ENVIRONMENT="production"

EXPOSE ${PORT}

CMD ["python", "app/main.py"]
