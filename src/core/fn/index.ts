import 'server-only'

import type z from 'zod'
import type { ZodType } from 'zod'
import { getPayload } from 'payload'
import payloadConfig from '@payload-config'

type PayloadClient = Awaited<ReturnType<typeof getPayload>>
export type Ctx = { payload: PayloadClient }

export const query = <Schema extends ZodType, T>(config: {
  args?: Schema
  handler: (
    ctx: Ctx,
    args: Schema extends undefined ? undefined : z.infer<Schema>,
  ) => Promise<T> | T
}): ((args?: Schema extends undefined ? undefined : z.infer<Schema>) => Promise<T>) => {
  return async (args?: Schema extends undefined ? undefined : z.infer<Schema>) => {
    if (config.args) config.args.parse(args ?? {})
    const payload = await getPayload({ config: payloadConfig })
    return config.handler({ payload }, args ?? ({} as any))
  }
}

export const mutation = <Schema extends ZodType, T>(config: {
  args?: Schema
  handler: (
    ctx: Ctx,
    args: Schema extends undefined ? undefined : z.infer<Schema>,
  ) => Promise<T> | T
}): ((args?: Schema extends undefined ? undefined : z.infer<Schema>) => Promise<T>) => {
  return async (args?: Schema extends undefined ? undefined : z.infer<Schema>) => {
    if (config.args) config.args.parse(args ?? {})
    const payload = await getPayload({ config: payloadConfig })
    return config.handler({ payload }, args ?? ({} as any))
  }
}
