import { existsSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { spawn } from 'node:child_process'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')

for (const name of ['.env.production.local', '.env.local', '.env.production', '.env']) {
  const path = resolve(root, name)
  if (existsSync(path)) {
    process.loadEnvFile(path)
  }
}

const serverPath = resolve(root, '.next/standalone/bin/run.mjs')
if (!existsSync(serverPath)) {
  console.error('Production build not found. Run npm run build first.')
  process.exit(1)
}

const child = spawn(process.execPath, ['--no-deprecation', serverPath], {
  cwd: root,
  env: {
    ...process.env,
    NODE_ENV: 'production',
    NODE_OPTIONS: [process.env.NODE_OPTIONS, '--no-deprecation'].filter(Boolean).join(' '),
  },
  stdio: 'inherit',
})

child.on('exit', (code, signal) => {
  if (signal) {
    process.kill(process.pid, signal)
    return
  }
  process.exit(code ?? 0)
})
