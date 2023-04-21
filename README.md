### Dependencies

```bash
# PNPM - Dependency Manager
$ brew install pnpm
# Tilt - Dev Environment
$ brew install tilt-dev/tap/tilt
# Docker
# https://docs.docker.com/desktop/install/mac-install/
```

## Environment

- Create `.env` file in root directory using `.env-example` as a template

## Run

```bash
$ tilt up
```

## Prisma Commands

```bash
# Use to create migration from schema changes
pnpx prisma migrate dev
# View database
pnpx prisma studio
# Seed
pnpx prisma db seed
```

## Deply to Railway

1. Provision Postgres Database
2. App Settings > Domains > Add Domain
3. App Settings > Environment Variables > Add Environment Variables
   - DATABASE_URL - follow prompt to set from provisioned database
   - NEXTAUTH_SECRET = some_string
   - NEXTAUTH_URL = https://{new_domain}

Build Command

```
pnpm build && pnpm migrate:deploy
```

Start Command

```
pnpm start
```
