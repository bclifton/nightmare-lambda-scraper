const vo = require('vo')
const Nightmare = require('nightmare')
require('nightmare-inline-download')(Nightmare)
const random_ua = require('./lib/random_ua')

module.exports = {
  runScrape,
}

function *runScrape(electronPath, callback) {
  let nightmare = Nightmare({
    show: true,
    electronPath: electronPath
  })

  console.log(nightmare.useragent());

  let href = yield nightmare
    .goto('https://duckduckgo.com')
    .type('#search_form_input_homepage', 'github nightmare')
    .click('#search_button_homepage')
    .wait('#r1-0 a.result__a')
    .evaluate(() => document.querySelector('#r1-0 a.result__a').href)

  yield nightmare.end()

  return nightmare
    .then(() => href)
    .catch((e) => console.error(e))
}

if (require.main === module) {

  console.log(random_ua.generate());

  vo(runScrape)
    .then((res) => console.log('done', res))
    .catch((e) => console.rror(e))
}
