# Basic Chat Interface

## Pre-requisites

1. Node.js
2. pnpm `npm i -g pnpm`

## Setup

1. Configure Environment variables
```bash
cp .env.example .env
source .env
```

2. State Database
```bash
docker compose up -d
```

3. Install dependencies
```bash
pnpm i
```

4. Run the server
```bash
pnpm dev:python
```
