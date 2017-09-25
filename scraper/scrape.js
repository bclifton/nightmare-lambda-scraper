const Nightmare = require('nightmare')
require('nightmare-inline-download')(Nightmare)
const random_ua = require('./../utils/random_ua')
const { newDebug, error } = require('./../utils/debug')
const { isOnLambda, electronPath } = require('./../utils/settings')

const debug = newDebug('scraper:scrape')


module.exports = {
  initializeNightmare,
  runScrape,
}


function *initializeNightmare() {
  let options = {
    show: true,
  }
  if (isOnLambda) {
    options.electronPath = electronPath
  }
  return Nightmare(options)
}


function *runScrape(nightmare, callback) {
  let ua = random_ua.generate()
  nightmare.useragent(ua)

  let href = yield nightmare
    .goto('https://duckduckgo.com')
    .type('#search_form_input_homepage', 'github nightmare')
    .click('#search_button_homepage')
    .wait('#r1-0 a.result__a')
    .evaluate(() => document.querySelector('#r1-0 a.result__a').href)

  debug(href);
  yield nightmare.end()

  return nightmare
    .then(() => href)
    .catch((e) => error(e))
}
