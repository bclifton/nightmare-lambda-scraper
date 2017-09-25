const vo = require('vo')
const Xvfb = require('./lib/xvfb')
const { initializeNightmare, runScrape } = require('./scraper/scrape')
const { newDebug, error } = require('./utils/debug')
const { isOnLambda, electronPath } = require('./utils/settings')

const debug = newDebug('scraper:index')


exports.handler = function(event, context){
  var xvfb = new Xvfb({
    xvfb_executable: '/tmp/pck/Xvfb',
    dry_run: !isOnLambda // in local environment execute callback of .start() without actual execution of Xvfb (for running in dev environment)
  })

  xvfb.start((err, xvfbProcess) => {

    if (err) context.done(err)

    function done(err, result){
      xvfb.stop((err) => context.done(err, result))
    }

    vo(initializeNightmare, runScrape)
      .then((res) => {
        debug(`done: ${res}`)
        done(null, res)
      })
      .catch((err) => {
        error(err)
        done(err)
      })

  })
}


if (require.main === module) {
  vo(initializeNightmare, runScrape)
    .then((res) => debug('done', res))
    .catch((e) => error(e))
}
