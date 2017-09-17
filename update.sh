zip -r deployment-package.zip index.js lib node_modules -x '*electron/dist*'

aws lambda update-function-code \
  --function-name <YOUR-FUNCTION-NAME> \
  --zip-file fileb://./deployment-package.zip
