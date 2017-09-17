const Nightmare = require('nightmare')

module.exports = {
  runScrape,
}

function runScrape(electronPath, done) {
  var nightmare = Nightmare({
    show: true,                   // show actual browser window as Nightmare clicks through
    electronPath: electronPath    // you MUST specify electron path which you receive from installation
  })

  nightmare
    .goto('https://duckduckgo.com')
    .type('#search_form_input_homepage', 'github nightmare')
    .click('#search_button_homepage')
    .wait('#r1-0 a.result__a')
    .evaluate(() => document.querySelector('#r1-0 a.result__a').href)
    .end()
    .then((result) => {
      console.log(result)
      done(null, result)
    })
    .catch((error) => {
      console.error('Search failed:', error)
      done(error)
    })
}



if (require.main === module) {
  runScrape(require('electron'), (err, result) => {
    if (err) console.error(err)
    console.log(result)
  })
}
