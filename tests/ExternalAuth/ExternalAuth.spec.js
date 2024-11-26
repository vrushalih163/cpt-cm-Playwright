const { user, password } = process.env;
import { test, expect, chromium } from '@playwright/test';
import { LoginPage } from '../../pages/PageLogin_111';

test('Home Page - RM Online Help - RM Online Help is accessible via the Home Page', async ({ page }) => {

    //Senario 1:
    const Login = new LoginPage(page);
    const page1 = await Login.SAMLLogin('AzureKiranSAML');
    
    await page1.close();
    await page.close();

    //Scenario 2:
  const browser = await chromium.launch();
  const page2 = await browser.newPage();

  const Login2 = new LoginPage(page2);
  const page3 = await Login2.SAMLLoginInvalid('AzureKiranSAML');
    await page3.close();
    await page2.close();

    //Scenario 3:
});