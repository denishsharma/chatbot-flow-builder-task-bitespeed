export type DeepPartial<T> = { [P in keyof T]?: DeepPartial<T[P]> }
export type DeepReadonly<T> = { readonly [P in keyof T]: DeepReadonly<T[P]> }
export type DeepWritable<T> = { -readonly [P in keyof T]: DeepWritable<T[P]> }
