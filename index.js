require('dotenv').config();
const AWS = require('aws-sdk');

// Load AWS credentials and region from environment variables
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION
});

const secretsManager = new AWS.SecretsManager();

async function getSecretValue(secretName) {
  return new Promise((resolve, reject) => {
    secretsManager.getSecretValue({ SecretId: secretName }, (err, data) => {
      if (err) {
        reject(err);
      } else {
        if ('SecretString' in data) {
          resolve(JSON.parse(data.SecretString));
        } else {
          const buff = Buffer.from(data.SecretBinary, 'base64');
          resolve(JSON.parse(buff.toString('ascii')));
        }
      }
    });
  });
}

(async () => {
  try {
    const secretName = process.env.SECRET_NAME;
    const secrets = await getSecretValue(secretName);
    
    // Add secrets to process.env
    Object.keys(secrets).forEach(key => {
      process.env[key] = secrets[key];
    });

    // Log all environment variables
    console.log(process.env);
  } catch (error) {
    console.error('Error retrieving secrets:', error);
  }
})();
