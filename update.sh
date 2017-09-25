#!/bin/bash +x
eval "$(./lib/yaml.sh ./config/config.yml)"

zip -r deployment-package.zip index.js lib config utils scraper node_modules -x '*electron/dist*' -x "*.DS_Store"

aws lambda update-function-code \
  --function-name ${function_name} \
  --zip-file fileb://./deployment-package.zip
