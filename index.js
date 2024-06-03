import {
  SecretsManagerClient,
  GetSecretValueCommand,
} from "@aws-sdk/client-secrets-manager";

const secret_name = "test_secret";

const client = new SecretsManagerClient({
  region: "us-east-1",
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

// Print out the secret called 'username'
console.log("Username:", secret.username);

