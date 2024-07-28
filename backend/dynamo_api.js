const express = require('express');
const AWS = require('aws-sdk');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.json());

// Configure AWS SDK
AWS.config.update({
    region: 'us-west-2', // Replace with your region
    accessKeyId: process.env.AWS_ACCESS_KEY_ID, // Use environment variables for security
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY // Use environment variables for security
});

const dynamoDB = new AWS.DynamoDB();

// Create Table
app.post('/create-table', (req, res) => {
    const { tableName, keySchema, attributeDefinitions, provisionedThroughput } = req.body;

    const params = {
        TableName: tableName,
        KeySchema: keySchema,
        AttributeDefinitions: attributeDefinitions,
        ProvisionedThroughput: provisionedThroughput
    };

    dynamoDB.createTable(params, (err, data) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.status(201).json({ message: 'Table created successfully', data });
        }
    });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
