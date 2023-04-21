docker_compose('docker/database.yml')

local_resource('nextjs', 'pnpm install', 
serve_cmd='pnpm dev',
deps=['package.json'],
resource_deps=['db'])

local_resource('run-prisma-migrations', cmd='pnpx prisma migrate dev', resource_deps=['nextjs'])

