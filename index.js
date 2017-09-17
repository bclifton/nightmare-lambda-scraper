const binaryPack = require('./lib/nightmare-lambda-pack');
const Xvfb = require('./lib/xvfb');
const Nightmare = require('nightmare');

var isOnLambda = binaryPack.isRunningOnLambdaEnvironment;
var electronPath = binaryPack.installNightmareOnLambdaEnvironment();

exports.handler = function(event, context){
  var xvfb = new Xvfb({
    xvfb_executable: '/tmp/pck/Xvfb',  // Xvfb executable will be at this path when unpacked from nigthmare-lambda-pack
    dry_run: !isOnLambda               // in local environment execute callback of .start() without actual execution of Xvfb (for running in dev environment)
  });

  xvfb.start((err, xvfbProcess) => {

    if (err) context.done(err);

    function done(err, result){
      xvfb.stop((err) => context.done(err, result));
    }

    var nightmare = Nightmare({
      show: true,                   // show actual browser window as Nightmare clicks through
      electronPath: electronPath    // you MUST specify electron path which you receive from installation
    });

    nightmare
      .goto('https://duckduckgo.com')
      .type('#search_form_input_homepage', 'github nightmare')
      .click('#search_button_homepage')
      .wait('#r1-0 a.result__a')
      .evaluate(() => document.querySelector('#r1-0 a.result__a').href)
      .end()
      .then(function (result) {
        console.log(result);
        done(null, result);  // done() instead of context.done()
      })
      .catch(function (error) {
        console.error('Search failed:', error);
        done(error);         // done() instead of context.done()
      })

  });
};
