# nightmare-lambda-scraper

This relies heavily on [dimkir's nightmare-lambda-tutorial](https://github.com/dimkir/nightmare-lambda-tutorial).

1. install the CLI for AWS: https://aws.amazon.com/cli/





#### Initializing:

1. Run `$ mv config.yml.template config.yml`. And in `config.yml` change:

   ```shell
   aws_region: us-east-1 # The region where your bucket is located and where your lambda script will run.
   aws_bucket: <YOUR-BUCKET-NAME> # Where lambda will look for the packaged Electron and Xvfb.
   function_name: <YOUR-FUNCTION-NAME> # The name of the lambda function.
   ```

2. Run `./upload_lambda_pack_to_s3.sh`

3. Run `./lambda_install_aws.sh`. If successful, the output should look like this:

   ```
   >>> Creating execution role ...
       Execution role name: [<YOUR-FUNCTION-NAME>-lambda-execution-role]
       Execution role arn: [arn:aws:iam::870900011006:role/<YOUR-FUNCTION-NAME>-lambda-execution-role]
   >>> Creating execution policy...
   >>> Creating lambda function...
   {
       "CodeSha256": "DbmazPvh1uvb38RUwypSaZB3qxo5xavqPxkgq9o/gt8fvOE=",
       "FunctionName": "<YOUR-FUNCTION-NAME>",
       "CodeSize": 3111164,
       "MemorySize": 1024,
       "FunctionArn": "arn:aws:lambda:us-east-1:870900011006:function:<YOUR-FUNCTION-NAME>",
       "Version": "$LATEST",
       "Role": "arn:aws:iam::870900011006:role/<YOUR-FUNCTION-NAME>-lambda-execution-role",
       "Timeout": 60,
       "LastModified": "2017-09-25T02:34:05.423+0000",
       "Handler": "index.handler",
       "Runtime": "nodejs6.10",
       "Description": ""
   }
   ```

4. `./update.sh` and `./test.sh`

5. `cat done.log` should be`"https://github.com/segmentio/nightmare"`, if it is `null`, then there was an error.



#### Updating:

1. `./update.sh && ./test.sh`



#### Testing locally without Lambda:

`DEBUG=nightmare:actions*,scraper:* node scrape.js`