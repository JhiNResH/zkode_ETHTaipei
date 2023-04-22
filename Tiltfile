docker_compose('docker/database.yml')

local_resource('nextjs', 'pnpm install', 
serve_cmd='pnpm dev',
deps=['package.json'],
resource_deps=['db'])

local_resource('run-prisma-migrations', cmd='pnpx prisma db push', resource_deps=['nextjs'])
local_resource('generate-new-client', cmd='pnpx prisma generate', resource_deps=['run-prisma-migrations'])


