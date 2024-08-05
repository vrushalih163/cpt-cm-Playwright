// import { test, expect } from '@playwright/test';

// import { PatientdefaultviewPage } from '../../pages/patientdefaultviewpage_631';

// import { ApplicationNavigator } from '../../pages/ApplicationNavigator';

// import path from 'path';



// test('test', async ({ page }) => {



//     await page.goto('https://pv01.extendedcare.health/', { waitUntil: 'networkidle' });

//     const page1Promise = page.waitForEvent('popup');

//     await page.getByRole('button', { name: 'Log In' }).click();

//     const page1 = await page1Promise;

//     await page1.locator('#UserNameTextBox').click();

//     await page1.locator('#UserNameTextBox').fill('Pavan');

//     await page1.locator('#UserNameTextBox').press('Tab');

//     await page1.locator('#PasswordTextBox').fill('Asdf@1234');

//     await page1.getByText('Log In').click();

//     await page1.waitForLoadState('domcontentloaded');

//     await page1.waitForTimeout(3000);



//     const PatientDefaultView = new PatientdefaultviewPage(page1);

//     const AppNav = new ApplicationNavigator(page1)



//     //Verify the connect Timeline functionality in 226280



//     await expect(page1.getByText('Allscripts QA Hospital 1 (')).toBeVisible();

//     // await page1.getByRole('link', { name: ' Manage' }).click();

//     // await page1.waitForLoadState('domcontentloaded');

//     // await page1.waitForTimeout(3000);

//     // await page1.getByRole('link', { name: 'Patients Ú' }).click();

//     // await page1.waitForLoadState('domcontentloaded');

//     // await page1.waitForTimeout(2000);

//     // await page1.getByRole('link', { name: 'Patients Default View' }).click();

//     // await page1.waitForLoadState('domcontentloaded');

//     // await page1.waitForTimeout(2000);

//     await AppNav.NavigateToPatientsDefaultView();

//     await page1.getByRole('link', { name: 'Maximize Panel' }).click();

//     await page1.waitForTimeout(2000);

//     await page1.locator('#ViewSearchBar_MRN').click();

//     await page1.locator('#ViewSearchBar_MRN').fill('Connect Int 1');

//     await page1.getByRole('button', { name: 'Search' }).click();

//     await page1.waitForLoadState('domcontentloaded');

//     await page1.waitForTimeout(5000);



//     await PatientDefaultView.NavigateActionDDBox('Show Admissions');

//     await page1.waitForLoadState('domcontentloaded');

//     await page1.waitForTimeout(2000);



//     await expect(page1.getByRole('link', { name: 'Navigate to Connect Timeline' })).toBeVisible();

//     await page1.getByRole('link', { name: 'Navigate to Connect Timeline' }).click();

//     await expect(page1.getByRole('heading', { name: 'Connect Timeline' })).toBeVisible();

//     await expect(page1.getByText('emergency').first()).toBeVisible();

//     await expect(page1.getByText('continuity of care document')).toBeVisible();

//     await page1.waitForLoadState('domcontentloaded');

//     await page1.waitForTimeout(2000);



//     // await page1.pause();

//     const page2Promise = page1.waitForEvent('popup');

//     await page1.getByText('continuity of care document').click();

//     const page2 = await page2Promise;

//     // await page2.waitForLoadState('domcontentloaded');



//     //Below code is used for evaluatig the pop up code which is opened on clicking continuity of care link



//     await page2.waitForTimeout(10000);
//     await page2.bringToFront();

//     await page2.keyboard.down('Control');
//     await page2.keyboard.press('a');
//     await page2.keyboard.up('Control');

//     await page2.waitForTimeout(5000);


//     // Evaluate script in the context of the page
//     const selectedText = await page2.evaluate(() => {
//         const selection = window.getSelection();
//         return selection.toString();
//     });

//     // Copy the selected text to the clipboard
//     await page2.evaluate(async (text) => {
//         await navigator.clipboard.writeText(text);
//     }, selectedText);

//     console.log('Selected text copied to clipboard:', selectedText);

//     await page2.pause();
//     await page2.keyboard.down('Control');
//     await page2.keyboard.press('c');
//     await page2.keyboard.up('Control');

//     await page2.pause();
//     await page2.close();

//     await page1.waitForTimeout(2000);

//     await page1.getByRole('link', { name: ' Info' }).click();

//     await page1.waitForTimeout(2000);

//     await page1.getByRole('link', { name: 'Send-A-Note' }).click();

//     await page1.waitForTimeout(2000);

//     await page1.locator('#Message').click();

//     await page1.keyboard.down('Control');
//     await page1.keyboard.press('V');
//     await page1.keyboard.up('Control');
//     await page1.pause()

//     const value = await page1.locator('#Message').inputValue();

//     expect(value).toContain('Alex Ramirez GONZALES')















//     // console.log(console.log(await page2.evaluate('location.href')));

//     // await page2.emulateMedia({ media: 'print' });

//     // await page2.screenshot({path: 'Connect1.png'});

//     // await page2.pdf({path: 'ContinuityOfCare.pdf',format: 'A4'});

//     // await page2.close();

//     // await page1.bringToFront();



//     // Below code is used for checking Connect Integration icon inside the admission context.



//     await page1.getByRole('link', { name: 'Discharge Planning' }).click();

//     await page1.waitForLoadState('domcontentloaded');

//     await page1.waitForTimeout(2000);

//     await expect(page1.getByTitle('Discharge Planning')).toBeVisible();

//     await expect(page1.getByRole('link', { name: 'Á' })).toBeVisible();

//     await page1.getByRole('link', { name: 'Á' }).click();

//     await expect(page1.getByRole('heading', { name: 'Connect Timeline' })).toBeVisible();

//     await expect(page1.getByText('emergency').first()).toBeVisible();

//     await expect(page1.getByText('continuity of care document')).toBeVisible();

//     await page1.waitForLoadState('domcontentloaded');

//     await page1.waitForTimeout(2000);



//     const page3Promise = page1.waitForEvent('popup');

//     await page1.getByText('continuity of care document').click();

//     const page3 = await page3Promise;

//     // await page3.waitForLoadState('domcontentloaded');

//     await page3.waitForTimeout(5000);



//     // console.log(console.log(await page3.evaluate('location.href')));

//     // await page3.emulateMedia({ media: 'print' });

//     // await page3.screenshot({path: 'Connect.png'});

//     // await page3.pdf({path: 'ContinuityOfCare.pdf',format: 'A4'});

//     // await page3.close();



//     await page1.getByText('close', { exact: true }).click();

//     await page1.getByRole('link', { name: '', exact: true }).click();



// });



