import type { ReactElement, ReactNode } from 'react'
import { isValidElement } from 'react'

import { Whenever } from '~@/components/generics/whenever'

type WhenProps = Readonly<{
  /** Condition to evaluate, can be a boolean or a function that returns a boolean. */
  condition: (() => boolean) | boolean;

  /** Children to render if the condition is true. */
  children: ReactNode;

  /** If true, the children will be rendered only if the condition is false. */
  not?: boolean;
}>

type ElseProps = Readonly<{
  /** Children to render if the condition is false. */
  children: ReactNode;
}>

type CheckProps = Readonly<{
  children: (ReactElement<WhenProps> | ReactElement<ElseProps>)[] | (ReactElement<WhenProps> | ReactElement<ElseProps>);
}>

/**
 * Render children based on the condition provided else render the else case.
 * If no else case is provided, nothing will be rendered.
 *
 * If multiple conditions are true, the first condition will be rendered.
 *
 * @param props
 * @param props.children Children to render based on the condition
 * @returns Children to render based on the condition
 *
 * @example
 * <Check>
 *   <Check.When condition={true}>
 *     <div>When condition is true</div>
 *   </Check.When>
 *
 *   <Check.When condition={false}>
 *     <div>When condition is false</div>
 *   </Check.When>
 *
 *   <Check.Else>
 *     <div>Else case</div>
 *   </Check.Else>
 * </Check>
 */
export function Check({ children }: CheckProps) {
  let elseCase: ReactElement<ElseProps> | null = null
  let matchedCase: ReactElement<WhenProps> | null = null;

  (Array.isArray(children) ? children : [children]).forEach((child) => {
    if (isValidElement<ElseProps>(child) && child.type === Check.Else) {
      elseCase = child
    } else if (isValidElement<WhenProps>(child) && child.type === Check.When && !matchedCase) {
      const condition = child.props.condition

      if (typeof condition === 'function' ? condition() : condition) {
        matchedCase = child
      }
    }
  })

  return matchedCase ?? elseCase
}

/**
 * When component to return matched case based on the condition
 *
 * @param props
 * @param props.condition Condition to evaluate, can be a boolean or a function that returns a boolean.
 * @param props.children Children to render if the condition is true.
 * @param props.not If true, the children will be rendered only if the condition is false.
 * @returns Matched case based on the condition
 */
Check.When = function When(props: WhenProps) {
  return <Whenever {...props} />
}

/**
 * Else component to return matched case based on the condition
 *
 * @param props
 * @param props.children Children to render if the condition is false.
 * @returns Matched case based on the condition
 */
Check.Else = function Else({ children }: ElseProps) {
  return <>{children}</>
}
