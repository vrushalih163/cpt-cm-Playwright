//Author: Rajakumar Maste, Created Date: 13 August 2024

import { test, expect } from '@playwright/test';
import { MailSlurp } from 'mailslurp-client';
require('dotenv').config();
const { SharedChoiceRecepientUser } = process.env;
const apiKey = process.env.MAILSLURP_API_KEY;
expect(apiKey).toBeDefined();


export class Mailslurp {
    constructor(page) {
        this.page = page;
    }

    /**
     * Create a new email id
     */
    async CreateMailIdInMailslurp() {
        // load playground app
        await page.goto("https://playground.mailslurp.com");
        await page.click('[data-test="sign-in-create-account-link"]');

        // create a new inbox
        const mailslurp = new MailSlurp({ apiKey });
        const password = "test-password";
        const { id, emailAddress } = await mailslurp.createInbox();

        console.log(`Created inbox with email address: ${emailAddress}`);

        // fill sign up form
        await page.fill('input[name=email]', emailAddress);
        await page.fill('input[name=password]', password);
        await page.click('[data-test="sign-up-create-account-button"]');

        // wait for verification code
        const email = await mailslurp.waitForLatestEmail(id);

        // extract the confirmation code (so we can confirm the user)
        const code = /([0-9]{6})$/.exec(email.body)[1];
        // enter confirmation code
        await page.fill('[data-test="confirm-sign-up-confirmation-code-input"]', code);
        await page.click('[data-test="confirm-sign-up-confirm-button"]');

        // fill out username (email) and password
        await page.fill('[data-test="username-input"]', emailAddress);
        await page.fill('[data-test="sign-in-password-input"]', password);
        // submit
        await page.click('[data-test="sign-in-sign-in-button"]');

    }

    /**
     * Enter the 'Text' of Link which is present in the mail body and want to launch.
     * 
     * @param {*} LinkName LinkName is nothing but the text of the link which is present in the email body.
     * @returns EmailBody_Link_page
     * 
     */
    async OpenTheLinkPresentInEMailBody(LinkName) {

        // create a new inbox
        const mailslurp = new MailSlurp({ apiKey });

        //spliting the username to get the id and domain
        const [localPart, domain] = SharedChoiceRecepientUser.split('@');
        //console.log('id:', localPart); // Output: da6273f8-e453-4b23-a3e4-449162168fc7
        //console.log(domain);    // Output: mailslurp.net

        //waiting for the email to arrive
        const email = await mailslurp.waitForLatestEmail(localPart);

        //checking the Link in the email body
        const linkRegex = new RegExp(`<a[^>]*href="([^"]*)"[^>]*>${LinkName}</a>`);

        // Extract the link from the email body
        const match = linkRegex.exec(email.body);
        if (!match) {
            throw new Error(`${LinkName} link not found in email`);
        }
        const EmailBody_Link = match[1];

        const EmailBody_Link_page = await page.goto(EmailBody_Link);
        //returning the link
        return EmailBody_Link_page;
    }
}
