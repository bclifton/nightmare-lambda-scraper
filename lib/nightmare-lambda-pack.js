/**
* This package allows using Nightmare with Electron on AWS Lambda.
* Package was inspired by the approach taken by:
* https://github.com/justengland/phantomjs-lambda-pack/
* https://github.com/justengland/phantomjs-lambda-pack/blob/master/index.js
*/
const YAML = require('yamljs')
let userConfig = YAML.load('./config/config.yml')
const defaultElectronPackageUrl = `https://s3.amazonaws.com/${userConfig.aws_bucket}/nightmare-lambda/nightmare-lambda-pck-with-xvfb-20170313-1726-43.zip`
const child_process = require('child_process')
const pack = exports = module.exports = {}
const SECOND = 1000 // millis
const config = {
  tmpdir: '/tmp',
  defaultElectronPackageUrl: defaultElectronPackageUrl,
  zipPath: 'pck/electron.patch.devshm' // path to electron executable within the path
}


pack.isRunningOnLambdaEnvironment = Boolean(process.env['AWS_LAMBDA_FUNCTION_NAME'])


pack._downloadFileSync = (url, destFilename) => {
  notEmpty(url, 'url parameter cannot be empty')
  notEmpty(destFilename, 'destFilename parameter cannot be empty')
  let destFilepath = `${config.tmpdir}/${destFilename}`
  child_process.execFileSync('curl', ['--silent', '--show-error', '-L', '-o', destFilepath, url], {
    encoding: 'utf-8'
  })
  return destFilepath
}

/**
* Copy contents of srcDir into existing targetDir
* @srcDir eg. '/var/task'  ("/*" will be added automatically )
* @targetDir eg. '/tmp/app'
*/
pack._copySync = (srcDir, targetDir) => {
  child_process.execSync(`cp -r ${srcDir}/* ${targetDir}`)
}


pack._df = () => {
  let stdout = child_process.execSync('df -h')
  return stdout.toString()
}


pack._mkdirSync = (dirName) => {
  child_process.execSync(`mkdir -p ${dirName}`)
}


pack._unzipFileSync = (zipFile, destFolder) => {
  child_process.execSync(`unzip -o ${zipFile} -d ${destFolder}`, { timeout: 60 * SECOND })
}


pack._walkSync = (currentDirPath, callback, excluded_files) => {
  excluded_files = excluded_files || []
  let fs = require('fs')
  let path = require('path')
  fs.readdirSync(currentDirPath).forEach((name) => {
    let filePath = path.join(currentDirPath, name)
    let stat = fs.statSync(filePath)
    if (stat.isFile()) {
      callback(filePath, stat)
    } else if (stat.isDirectory() && (excluded_files.indexOf(name) < 0) )  {
      pack._walkSync(filePath, callback, excluded_files)
    }
  })
}

/*
* This is synchronous
* @opts.electronPackageUrl url to the electron package zip.
* @return electron path
*/
pack.installNightmare = (opts) => {
  let url, zipFile, zipPath
  opts = opts || {}
  url = opts.electronPackageUrl || config.defaultElectronPackageUrl
  zipPath = opts.zipPath || config.zipPath
  zipFile = pack._downloadFileSync(url, `pck.zip`)
  pack._unzipFileSync(zipFile, '/tmp')
  pack._mkdirSync('/tmp/shm')
  return `/tmp/${zipPath}`
}


pack.installNightmareOnLambdaEnvironment = (opts) => {
  if ( !pack.isRunningOnLambdaEnvironment ) return
  return pack.installNightmare(opts)
}


function notEmpty(argValue, msg) {
  if (!argValue) throw new Error(msg)
}
