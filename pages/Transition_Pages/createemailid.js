require('dotenv').config();
const { MailSlurp } = require('mailslurp-client');
const fs = require('fs');
const path = require('path');

const apiKey = process.env.MAILSLURP_API_KEY;

if (!apiKey) {
    throw new Error('Missing MAILSLURP_API_KEY environment variable');
}

async function CreateMailIdInMailslurp() {
    try {
        // Create a new inbox
        const mailslurp = new MailSlurp({ apiKey });
        const { emailAddress } = await mailslurp.createInbox();

        console.log(`Created inbox with email address: ${emailAddress}`);

        // Return the newly created email address
        return emailAddress;
    } catch (error) {
        console.error('Error creating MailSlurp inbox:', error);
        throw error;
    }
}

// Function to update the environment variable
function updateEnvVariable(newEmail) {
    try {
        const envPath = path.resolve(__dirname, '.env.pv01');
        let envContent = fs.readFileSync(envPath, 'utf8');
        const newEnvContent = envContent.replace(/MailSlurpEMailId=.*/, `MailSlurpEMailId=${newEmail}`);
        fs.writeFileSync(envPath, newEnvContent);
        console.log(`Updated MailSlurpEMailId to ${newEmail}`);
    } catch (error) {
        console.error('Error updating environment variable:', error);
        throw error;
    }
}

// Trigger the function every 6 days (6 * 24 * 60 * 60 * 1000 milliseconds)
setInterval(async () => {
    try {
        const newEmail = await CreateMailIdInMailslurp();
        updateEnvVariable(newEmail);
    } catch (error) {
        console.error('Error in interval function:', error);
    }
}, 6 * 24 * 60 * 60 * 1000);

// Initial call to set the email ID immediately
(async () => {
    try {
        const newEmail = await CreateMailIdInMailslurp();
        updateEnvVariable(newEmail);
    } catch (error) {
        console.error('Error in initial call:', error);
    }
})();