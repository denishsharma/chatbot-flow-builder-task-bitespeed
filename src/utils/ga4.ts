import ReactGA from 'react-ga4'

export function trackSocialLinkClick(label: string) {
  ReactGA.event({ category: 'social-link', action: 'click', label })
}

export function trackFlowBuilderAddNode(type: string) {
  ReactGA.event({ category: 'flow-builder', action: 'add-node', label: type })
}

export function trackFlowBuilderDeleteNode() {
  ReactGA.event({ category: 'flow-builder', action: 'delete-node' })
}

export function trackFlowBuilderValidate() {
  ReactGA.event({ category: 'flow-builder', action: 'validate' })
}

export function trackSomethingInNodeProperties(label?: string) {
  ReactGA.event({ category: 'node-properties', action: 'exploration', label })
}
