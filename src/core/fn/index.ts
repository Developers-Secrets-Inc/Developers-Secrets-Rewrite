import 'server-only'

import z, { ZodType } from 'zod'


export const query = <Schema extends ZodType, T>(config: {
  args?: Schema
  handler: (args: Schema extends undefined ? undefined : z.infer<Schema>) => Promise<T> | T
}): ((args?: Schema extends undefined ? undefined : z.infer<Schema>) => Promise<T>) => {
  return async (args?: Schema extends undefined ? undefined : z.infer<Schema>) => {
    if (config.args) config.args.parse(args ?? {})
    return config.handler(args ?? ({} as any))
  }
}

export const mutation = <Schema extends ZodType, T>(config: {
  args?: Schema
  handler: (args: Schema extends undefined ? undefined : z.infer<Schema>) => Promise<T> | T
}): ((args?: Schema extends undefined ? undefined : z.infer<Schema>) => Promise<T>) => {
  return async (args?: Schema extends undefined ? undefined : z.infer<Schema>) => {
    if (config.args) config.args.parse(args ?? {})
    return config.handler(args ?? ({} as any))
  }
}
