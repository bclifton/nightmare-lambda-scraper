#!/bin/bash +x
eval "$(./lib/yaml.sh ./config/config.yml)"

aws lambda invoke --function-name ${function_name} --payload {} done.log
