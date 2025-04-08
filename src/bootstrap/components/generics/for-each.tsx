import type { ReactNode } from 'react'
import { hash } from 'ohash'
import { Fragment } from 'react'

type ForProps<T> = Readonly<{
  /** Items to iterate */
  items: T[];

  /** Children to render */
  children: (item: T, index: number, __key: string) => ReactNode;
}>

/**
 * For each component to iterate over items and render children
 *
 * @param props
 * @param {T[]} props.items Items to iterate
 * @param {(item: T, index: number, __key: string) => ReactNode} props.children Children to render
 * @returns Rendered children
 *
 * @example
 * <ForEach items={items}>
 *   {(item, _, key) => (
 *     <div>{item} - {key}</div>
 *   )}
 * </ForEach>
 */
export function ForEach<T>({ items, children }: ForProps<T>) {
  const keyedItems = items.map((item, index) => ({ key: hash({ item, '__x-key-of': index }), item }))

  return (
    keyedItems.map(({ key, item }, index) => (
      <Fragment key={key}>{children(item, index, key)}</Fragment>
    ))
  )
}
