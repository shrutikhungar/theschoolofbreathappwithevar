const express = require('express');
const { SecretManagerServiceClient } = require('@google-cloud/secret-manager');

// Load your Google Cloud credentials file
const client = new SecretManagerServiceClient();

const app = express();
const port = process.env.PORT || 3000;

// Endpoint to fetch secrets from Google Secret Manager
app.get('/getSecret/:secretName', async (req, res) => {
  const { secretName } = req.params;
  
  try {
    console.log(`Retrieving secret for: ${secretName}`);

    // Fetch the secret
    const [version] = await client.accessSecretVersion({
      name: `projects/sleepmusicapp-413415/secrets/${secretName}/versions/latest`,
    });

    const secretPayload = version.payload.data.toString();
    
    if (!secretPayload) {
      return res.status(404).send('Secret not found or is empty');
    }

    console.log(`Secret ${secretName} successfully retrieved: ${secretPayload}`);
    return res.json({ secret: secretPayload });
  } catch (error) {
    console.error(`Error retrieving secret ${secretName}:`, error);
    return res.status(500).send('Error retrieving secret');
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
