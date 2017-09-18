# nightmare-lambda-scraper

This relies heavily on [dimkir's nightmare-lambda-tutorial](https://github.com/dimkir/nightmare-lambda-tutorial).



#### Initializing:

The s3 and lambda functions need to be set in the same region.

1. Upload the `nightmare-lambda-pck` to s3: `aws s3 cp nightmare-lambda-pck-with-xvfb-20170313-1726-43.zip  s3://<YOUR-BUCKET-NAME>/nightmare-lambda-pck-with-xvfb-20170313-1726-43.zip`

2. `mv config.js.template config.js`

3. In `config.js` > add your bucket's name to the value for `defaultElectronPackageUrl`

4. Modify the settings in `lambda-install-aws.sh`:

   ```shell
   FUNCTION=your-function-name # change this to your function's name
   REGION=us-east-1            # change this to the appropriate region
   DEPLOYMENT_PACKAGE_ZIP=deployment-package.zip
   TIMEOUT=60
   RUNTIME=nodejs6.10
   ```

5. Run:

   ```shell
   chmod +x lambda-install-aws.sh
   chmod +x update.sh
   chmod +x test.sh
   ```

6. Run `./lambda-install-aws.sh`

7. Update and run: `./test.sh`

8. `cat done.log` should be`"https://github.com/segmentio/nightmare"`, if it is `null`, then there was an error.



#### Updating:

1. `./update.sh && ./test.sh`



#### Testing locally without Lambda:

`node scrape.js`