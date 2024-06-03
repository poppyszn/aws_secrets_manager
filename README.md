
# AWS Secrets and Node.js

This is a sample application to guide us on how to link AWS Secrets to our Node.js application.

## Configure AWS CLI
- Install or update to the latest version of the AWS CLI [here](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html)
- Run `aws configure` to setup your AWS credentials with your AWS Access Key, AWS Secret Access Key and the Region of the AWS Secret.

##  Create a Secret in AWS Secret Manager
In the AWS Management Console, go to the Secrets Manager service and create a new secret.

## Access the Secret in your Node.js Application
- Install the required aws sdk using the command below:
```bash
npm install @aws-sdk/client-secrets-manager
```
- Import the module into the app and replace any instance of `secret_name` and `secret_region` with the actual values. The following code can be found on your secrets console or you can use the template below:
```javascript
import {
  SecretsManagerClient,
  GetSecretValueCommand,
} from "@aws-sdk/client-secrets-manager";

const secret_name = "secret_name";

const client = new SecretsManagerClient({
  region: "secret_region",
});

let response;

try {
  response = await client.send(
    new GetSecretValueCommand({
      SecretId: secret_name,
      VersionStage: "AWSCURRENT", 
    })
  );
} catch (error) {
  throw error;
}

const secret = JSON.parse(response.SecretString);
```
## Run the Sample Application
You can run the sample application by using `npm install` then run `node index.js` to see how the secret will be outputed.

#### Please note that the secret you use in the app has to be named thesame way it is, in the secrets manager e.b  DB_USER (on secrets manager) and DB_USER (locally on node.js) 
