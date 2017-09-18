const vo = require('vo')
const binaryPack = require('./lib/nightmare-lambda-pack')
const Xvfb = require('./lib/xvfb')
const { runScrape } = require('./scrape')

var isOnLambda = binaryPack.isRunningOnLambdaEnvironment
var electronPath = binaryPack.installNightmareOnLambdaEnvironment()

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

    vo(runScrape)
      .then((res) => {
        console.log('done', res)
        done(null, res)
      })
      .catch((err) => {
        console.error(err)
        done(err)
      })

  })
}
