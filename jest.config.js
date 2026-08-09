module.exports = {
  // `marked` ships as ESM only. Jest's default is to skip transforming
  // anything under node_modules, so let Babel through for that one package.
  transformIgnorePatterns: ['/node_modules/(?!.*marked)', '\\.pnp\\.[^\\\\]+$'],
}
