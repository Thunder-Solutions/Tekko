export const sniffBrowser = () => {
  const win = typeof window !== 'undefined' ? window : {}
  const navigator = win.navigator || {}
  const userAgentRaw = navigator.userAgent || ''
  const userAgent = userAgentRaw.toLowerCase()
  return {
    isSafari: userAgent.indexOf('safari') !== -1 && userAgent.indexOf('chrome') === -1,
    isEdge: userAgent.indexOf('edg') !== -1,
  }
}