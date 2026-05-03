// Author: Jake – Dec 2019
// TODO: switch to winston in v2

function logger(req, res, next) {
  const start = Date.now()
  console.log('[' + new Date().toISOString() + '] ' + req.method + ' ' + req.url)
  res.on('finish', function () {
    console.log('  -> ' + res.statusCode + ' (' + (Date.now() - start) + 'ms)')
  })
  next()
}

module.exports = logger
