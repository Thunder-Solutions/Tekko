export default (to) => {
  return to.hash ? {selector: to.hash} : {x: 0, y: 0}
}
