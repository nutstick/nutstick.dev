/* eslint-disable react/prefer-stateless-function, max-classes-per-file */
/**
 * This should be removed once added upstream:
 * https://github.com/TylerBarnes/gatsby-plugin-transition-link/pull/202
 */

declare module 'gatsby-plugin-transition-link' {
  import { Component, RefObject, ReactNode } from 'react'
  import { GatsbyLinkProps as GatsbyLinkPropsGeneric } from 'gatsby'
  import { NavigateOptions } from '@reach/router'

  type GatsbyLinkProps = GatsbyLinkPropsGeneric<any>

  interface TransitionHandlerProps {
    injectPageProps?: boolean
  }

  class TransitionHandler extends Component<TransitionHandlerProps> {}

  export type TransitionStatuses = 'entering' | 'entered' | 'exiting' | 'exited'

  interface TransitionStateProps {
    children: ({
      mount,
      transitionStatus,
    }: {
      mount: boolean
      transitionStatus: TransitionStatuses
    }) => ReactNode
  }

  class TransitionState extends Component<TransitionStateProps> {}

  type TransitionPortalLevels = 'top' | 'bottom' | 'middle'

  interface TransitionPortalProps {
    level?: TransitionPortalLevels
  }

  class TransitionPortal extends Component<TransitionPortalProps> {}

  interface InternalContext<State = any> {
    inTransition: boolean
    disableAnimation: boolean
    e: false | Event
    exitDelay: number
    exitLength: number
    exitState: State
    exitTrigger: false | ExitEntryTriggerFn<State>
    exitProps: any
    entryDelay: number
    entryLength: number
    entryState: State
    entryProps: any
    entryTrigger: false | ExitEntryTriggerFn<State>
    updateContext: (obj: Partial<InternalContext<State>>) => void
  }

  interface TransitionObserverProps {
    forceRender?: boolean
    children: (
      contextState: InternalContext,
      innerRef: RefObject<unknown>
    ) => ReactNode
  }

  class TransitionObserver extends Component<TransitionObserverProps> {}

  interface TriggerFnProps<State> {
    node: HTMLElement
    e: Event
    entry: EntryExit<State>
    exit: EntryExit<State>
  }

  export type ExitEntryTriggerFn<State = object> = ({
    exit,
    node,
  }: TriggerFnProps<State>) => void

  export interface EntryExit<State = object> {
    state?: State
    appearAfter?: number
    length?: number
    zIndex?: number
    delay?: number
    activeClass?: string
    className?: string
    trigger?: ExitEntryTriggerFn<State>
  }

  export interface TriggerEntryExit<State = object> extends EntryExit<State> {
    node: HTMLElement
  }

  interface TriggerPages<State> {
    entry: Promise<TriggerEntryExit<State>>
    exit: Promise<TriggerEntryExit<State>>
  }

  interface UseTriggerTransitionOptions<State = any, LinkState = any> {
    event?: Event
    to?: string
    disableAnimation?: boolean
    replace?: NavigateOptions<LinkState>['replace']
    linkState?: NavigateOptions<LinkState>['state']
    exit?: EntryExit<State>
    entry?: EntryExit<State>
    inTransition?: boolean
    pages?: TriggerPages<State>
    trigger?: ExitEntryTriggerFn<State>
    preventScrollJump?: boolean
  }

  type programmaticallyTriggerTransition<State, LinkState> = (
    calledOptions?: Event | UseTriggerTransitionOptions<State, LinkState>
  ) => void
  const useTriggerTransition: <State, LinkState>(
    defaultOptions: UseTriggerTransitionOptions<State, LinkState>
  ) => programmaticallyTriggerTransition<State, LinkState>

  interface TransitionLinkProps<State = any>
    extends Omit<GatsbyLinkProps, 'onClick' | 'innerRef'> {
    exit: EntryExit<State>
    entry: EntryExit<State>
    state?: State
    replace?: NavigateOptions<any>['replace']
    preventScrollJump?: boolean
    trigger?: (pages: TriggerPages<State>) => void
    exitLength?: number
    entryDelay?: number
    exitFn?: Function
    entryState?: object
    to: GatsbyLinkProps['to']
    className?: GatsbyLinkProps['className']
    activeStyle?: GatsbyLinkProps['activeStyle']
    style?: GatsbyLinkProps['style']
    activeClassName?: GatsbyLinkProps['activeClassName']
    partiallyActive?: GatsbyLinkProps['partiallyActive']
    onClick?: (
      event: Parameters<Exclude<GatsbyLinkProps['onClick'], undefined>>[0],
      weShouldNavigate: boolean
    ) => void
    innerRef?: GatsbyLinkProps['ref']
    ref?: GatsbyLinkProps['ref']
  }

  class TransitionLink extends Component<TransitionLinkProps> {}

  export {
    TransitionHandler,
    TransitionState,
    TransitionPortal,
    TransitionObserver,
    useTriggerTransition,
  }

  export default TransitionLink
}

declare module 'gatsby-plugin-transition-link/hooks' {
  interface TriggerFnProps<State> {
    node: HTMLElement
    e: Event
    entry: EntryExit<State>
    exit: EntryExit<State>
  }

  export type ExitEntryTriggerFn<State = object> = ({
    exit,
    node,
  }: TriggerFnProps<State>) => void

  export interface EntryExit<State = object> {
    state?: State
    appearAfter?: number
    length?: number
    zIndex?: number
    delay?: number
    activeClass?: string
    className?: string
    trigger?: ExitEntryTriggerFn<State>
  }

  interface UseTriggerTransitionOptions<State = any, LinkState = any> {
    event?: Event
    to?: string
    disableAnimation?: boolean
    replace?: NavigateOptions<LinkState>['replace']
    linkState?: NavigateOptions<LinkState>['state']
    exit?: EntryExit<State>
    entry?: EntryExit<State>
    inTransition?: boolean
    pages?: TriggerPages<State>
    trigger?: ExitEntryTriggerFn<State>
    preventScrollJump?: boolean
  }

  type programmaticallyTriggerTransition<State, LinkState> = (
    calledOptions?: Event | UseTriggerTransitionOptions<State, LinkState>
  ) => void

  const useTriggerTransition: <State, LinkState>(
    defaultOptions: UseTriggerTransitionOptions<State, LinkState>
  ) => programmaticallyTriggerTransition<State, LinkState>

  export type TransitionStatuses = 'entering' | 'entered' | 'exiting' | 'exited'

  const useTransitionState: <State = object>() => TriggerFnProps<State> & {
    transitionStatus: TransitionStatuses
    mount: boolean
  }
}
