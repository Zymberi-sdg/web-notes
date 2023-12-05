const express = require('express');
const { google } = require('googleapis');
const cors = require('cors');

const app = express();
app.use(cors());

const CLIENT_ID = '924991477888-ha1n0ri58ckeci26jmo7q7q2icsvrut7.apps.googleusercontent.com';
const CLIENT_SECRET = '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';
const REDIRECT_URI = 'http://localhost:5000/auth/google/callback';

const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);

// Generate an authentication URL
const authUrl = oAuth2Client.generateAuthUrl({
  access_type: 'offline',
  scope: [
    'https://www.googleapis.com/auth/drive.readonly', // Adjust scope based on what permissions you need
  ],
});

// Endpoint to initiate the Google Drive API authentication flow
app.get('/auth/google', (req, res) => {
  res.redirect(authUrl);
});

// Callback endpoint to handle authentication and fetch the document content
app.get('/auth/google/callback', async (req, res) => {
  const { code } = req.query;

  try {
    const { tokens } = await oAuth2Client.getToken(code);
    oAuth2Client.setCredentials(tokens); // Set tokens here

    const drive = google.drive({ version: 'v3', auth: oAuth2Client });

    //The ID of the document to fetch
    const fileId = '14r5fY778bSQLAIOO_HFOjyV-ZukoqapT3U72HJoPyBg';
    const response = await drive.files.export({
      fileId,
      mimeType: 'text/plain',
    });

    const documentContent = response.data;

    console.log(documentContent);

    res.send('Document content fetched successfully!');
  } catch (error) {
    console.error('Error fetching document content:', error);
    res.status(500).send('Error fetching document content');
  }
});

app.get('/fetch-document', async (req, res) => {
  try {
    const tokens = oAuth2Client.credentials; 
    if (!tokens) throw new Error('No access, refresh token, API key, or refresh handler callback is set.');

    const drive = google.drive({ version: 'v3', auth: oAuth2Client });

    const fileId = '14r5fY778bSQLAIOO_HFOjyV-ZukoqapT3U72HJoPyBg'; 
    const response = await drive.files.export({
      fileId,
      mimeType: 'text/plain', 
    });

    const documentContent = response.data;
    res.json(documentContent); 
  } catch (error) {
    console.error('Error fetching document content:', error);
    res.status(500).send('Error fetching document content');
  }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
