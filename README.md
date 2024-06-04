
# AWS Secrets and Node.js

This is a sample application to guide us on how to link AWS Secrets to our Node.js application.

## Configure AWS Credentials
- Set your AWS Credentials as environment variables
- Your `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`, `AWS_REGION` and `SECRET_NAME`

##  Create a Secret in AWS Secret Manager
In the AWS Management Console, go to the Secrets Manager service and create a new secret.

## Access the Secret in your Node.js Application
- Install the required aws sdk using the command below:
```bash
npm install aws-sdk dotenv
```

## Run the Sample Application
The application collects alll the values from the AWS Secret Manager then adds them to the app's process.env.
Then logs all the secrets in the console.

You can run the sample application by using `npm install` then run `node index.js` to see how the secret will be outputed.
