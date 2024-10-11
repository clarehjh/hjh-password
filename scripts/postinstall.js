const { switchVersion, loadModule } = require('./utils')

const Vue = loadModule('vue')
const version = process.argv.length > 2 ? process.argv[process.argv.length - 1] : Vue.version

if (!Vue || typeof version !== 'string')
  console.warn('[vue-demi-sfc-component-template] Vue is not found. Please run "npm install vue" to install.')

else if (version.startsWith('2.7.'))
  switchVersion('2.7')

else if (version.startsWith('2.'))
  switchVersion('2')

else if (version.startsWith('3.'))
  switchVersion('3')

else
  console.warn(`[vue-demi-sfc-component-template] Vue version v${version} is not suppported.`)