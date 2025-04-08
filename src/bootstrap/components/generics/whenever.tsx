import type { ReactNode } from 'react'

type WheneverProps = Readonly<{
  /** Condition to evaluate, can be a boolean or a function that returns a boolean. */
  condition: (() => boolean) | boolean;

  /** Children to render if the condition is true. */
  children: ReactNode;

  /** If true, the children will be rendered only if the condition is false. */
  not?: boolean;
}>

/**
 * Renders the children only if the condition is true when not is not provided, or if the condition is false when not is true.
 *
 * @param props
 * @param props.condition Condition to evaluate, can be a boolean or a function that returns a boolean.
 * @param props.children Children to render if the condition is true.
 * @param props.not If true, the children will be rendered only if the condition is false.
 * @returns The children if the condition is true, otherwise null.
 *
 * @example
 * <Whenever condition={true}>
 *   <div>Rendered</div>
 * </Whenever> // Renders the div
 *
 * <Whenever condition={false}>
 *   <div>Not Rendered</div>
 * </Whenever> // Renders nothing
 *
 * <Whenever condition={true} not>
 *   <div>Not Rendered</div>
 * </Whenever> // Renders nothing
 *
 * <Whenever condition={false} not>
 *   <div>Rendered</div>
 * </Whenever> // Renders the div
 */
export function Whenever({ condition, children, not }: WheneverProps) {
  const evaluated = typeof condition === 'function' ? condition() : condition

  return (not ? !evaluated : evaluated) ? <>{children}</> : null
}
