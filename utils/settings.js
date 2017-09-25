const binaryPack = require('./../lib/nightmare-lambda-pack')

module.exports = {
  isOnLambda: binaryPack.isRunningOnLambdaEnvironment,
  electronPath: binaryPack.installNightmareOnLambdaEnvironment(),
}
