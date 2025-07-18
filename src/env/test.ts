import { config } from 'dotenv'
import { z } from 'zod'

config({ path: '.env.test', override: true })

const envSchema = z.object({
  NODE_ENV: z.enum(['dev', 'test', 'production']).default('test'),
  DATABASE_URL: z.string(),
  APP_SECRET: z.string(),
})

const _env = envSchema.safeParse(process.env)

if (!_env.success) {
  console.error('❌ Invalid environment variables.', _env.error.format())

  throw new Error('Invalid environment variables.')
}

export const env = _env.data 