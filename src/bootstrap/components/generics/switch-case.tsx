import type { ReactElement, ReactNode } from 'react'
import { isValidElement } from 'react'

type CaseProps<T, > = Readonly<{
  /** Single or multiple values to match */
  value: T | T[];
  children: ReactNode;
}>

type DefaultProps = Readonly<{
  children: ReactNode;
}>

type SwitchProps<T, > = Readonly<{
  /** Value to match */
  match: T;
  /** Cases or Default case */
  children: (ReactElement<CaseProps<T>> | ReactElement<DefaultProps>)[] | (ReactElement<CaseProps<T>> | ReactElement<DefaultProps>);
}>

/**
 * Switch case component to match value with cases and return first matched case or default case
 *
 * @param props
 * @param {T} props.match Value to match
 * @param {ReactElement<CaseProps<T>> | ReactElement<DefaultProps>} props.children Cases or Default case
 *
 * @returns Matched case or Default case
 * @example
 * <Switch match={match}>
 *   <Switch.Case value="one">
 *     <div>case one</div>
 *   </Switch.Case>
 *   <Switch.Case value="two">
 *      <div>case two</div>
 *   </Switch.Case>
 *   <Switch.Default>
 *      <div>default case</div>
 *   </Switch.Default>
 * </Switch>
 */
export function Switch<T, >({ match, children }: SwitchProps<T>) {
  let defaultCase: ReactElement<DefaultProps> | null = null
  let matchedCase: ReactElement<CaseProps<T>> | null = null;

  (Array.isArray(children) ? children : [children]).forEach((child) => {
    if (isValidElement<DefaultProps>(child) && child.type === Switch.Default) {
      defaultCase = child
    } else if (isValidElement<CaseProps<T>>(child) && child.type === Switch.Case && !matchedCase) {
      const caseValue = child.props.value

      if (Array.isArray(caseValue) ? caseValue.includes(match) : caseValue === match) {
        matchedCase = child
      }
    }
  })

  return matchedCase ?? defaultCase
}

/**
 * Case component to return matched case
 *
 * @param {T | T[]} value Single or multiple values to match
 * @returns {ReactNode} Matched case
 * @example
 * <Switch.Case value="one">
 *   <div>case one</div>
 * </Switch.Case>
 *
 * <Switch.Case value={["two", "three"]}>
 *   <div>case two or three</div>
 * </Switch.Case>
 */
Switch.Case = function <T, >({ children }: CaseProps<T>) {
  return children
}

/**
 * Default case component to return default case
 *
 * @returns {ReactNode} Default case
 * @example
 * <Switch.Default>
 *   <div>default case</div>
 * </Switch.Default>
 */
Switch.Default = function ({ children }: DefaultProps) {
  return children
}
