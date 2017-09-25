const createDebug = require('debug')
// NOTE: Available colors:
//       0: 'lightseagreen',
//       1: 'forestgreen',
//       2: 'goldenrod',
//       3: 'dodgerblue',
//       4: 'darkorchid',
//       5: 'crimson'
const scrapeColor = createDebug.colors[3]
const parseColor = createDebug.colors[0]
const errorColor = createDebug.colors[5]
// NOTE: Nightmare uses 4: 'darkorchid'


const error = createDebug('scraper:error')
error.color = errorColor


function newDebug(name, i) {
  let d = createDebug(name)
  d.color = i ? createDebug.colors[i] : scrapeColor
  return d
}


module.exports = {
  newDebug,
  error,
}
