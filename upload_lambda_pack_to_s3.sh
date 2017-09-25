#!/bin/bash +x
eval "$(./lib/yaml.sh ./config/config.yml)"

aws s3 cp nightmare-lambda-pck-with-xvfb-20170313-1726-43.zip  s3://${aws_bucket}/nightmare-lambda-pck-with-xvfb-20170313-1726-43.zip
