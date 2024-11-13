//Author - Nagapradeep Kolasani Date: 11th November 2024
//Modified - Rajakumar Maste Date: 13th November, 2024
import { test, expect } from '@playwright/test';
import { LIB } from '../../bizLibs/lib';
import { ManageReferral } from '../../pages/Transition_Pages/ManageReferralPage';
import { ProviderSearchPage } from '../../pages/Transition_Pages/ProviderSearchPage';
import { ProviderTab } from '../../pages/Transition_Pages/ProviderTabPage';


const { QAProvider1, QAProvider2 } = process.env;
const ReferralType = 'Automation - With Selection Factor';
const SelectionFactor = 'Active with Agency';

test('Transition - Support Selection Factors', async ({ }) => {
  // Step 1: Launch EPIC on FHIR or Transition application
  const Library = new LIB();

  const newPage = await Library.HandleAppLaunch('Grand Central, John', 'E3228', 'Manage Referrals');
  const MngReferral = new ManageReferral(newPage);

  // Step 2: Click on Create referral and select 'Automation - Transportation' referral type and click on Create Referral.
  await MngReferral.CreateNewReferral(ReferralType);

  // Select the provider and send the referral
  const providerSearch = new ProviderSearchPage(newPage);
  await providerSearch.ClickSearchProviderButton();
  await providerSearch.SearchProvider(QAProvider1);
  //await providerSearch.SelectProvider(QAProvider2);
  await providerSearch.SendReferral();
  await MngReferral.ClickFirstReferral();

  const Provdertab = new ProviderTab(newPage);
  await Provdertab.Click_EllipseIcon(1);
  await Provdertab.SelectedProvider_Dropdown(QAProvider1);
  await Provdertab.SelectionFactor_OptionSelection(SelectionFactor);


  await page1.getByRole('row', { name: 'QA Provider #1 (80891)   555-' }).locator('#anchorMenu').click();
  await page1.getByRole('menuitem', { name: 'Place Referral' }).click();
  await expect(page1.locator('div').filter({ hasText: /^Selection Factors \*$/ }).nth(3)).toBeVisible();
  await page1.locator('#acm-mat-multiselect-52 span').first().click();
  await page1.locator('#mat-checkbox-1216 > .mat-checkbox-layout > .mat-checkbox-inner-container').click();
  await page1.locator('#mat-checkbox-1217 > .mat-checkbox-layout > .mat-checkbox-inner-container').click();
  await page1.getByText('QA Provider #1 (80891)Selected Provider *Selection Factors *').click();
  await page1.getByText('You may continue').click();
  await page1.getByRole('menuitem', { name: 'Place Referral' }).click();
  await page1.getByLabel('Select Values').click();
  await page1.locator('#mat-checkbox-1232 > .mat-checkbox-layout > .mat-checkbox-inner-container').click();
  await page1.locator('#mat-checkbox-1233 > .mat-checkbox-layout > .mat-checkbox-inner-container').click();
  await page1.getByText('You may continue').click();
  await expect(page1.getByRole('button', { name: 'Place' })).toBeVisible();
  await page1.getByRole('button', { name: 'Place' }).click();
  await expect(page1.getByText('Reasons: Active with Agency,')).toBeVisible();
  await page1.getByText('edit').click();
  await expect(page1.getByLabel('Select Values')).toBeVisible();
  await page1.locator('#acm-mat-multiselect-54 span').first().click();
  await page1.locator('#mat-checkbox-1275 > .mat-checkbox-layout > .mat-checkbox-inner-container').click();
  await page1.locator('#Edit').click();
  await page1.locator('mat-dialog-content').click();
  await page1.locator('#Edit').click();
  await page1.locator('mat-dialog-actions').filter({ hasText: 'Edit Selection Factors' }).click();
  await page1.getByRole('button', { name: 'Update Selection Factors' }).click();
  await page1.getByRole('row', { name: 'QA Provider #1 (80891)   555-' }).locator('#anchorMenu').click();
  await page1.getByRole('menuitem', { name: 'Unplace Referral' }).click();
  await page1.getByRole('button', { name: 'Unplace' }).click();
  await page1.getByRole('row', { name: 'QA Provider #1 (80891)   555-' }).locator('#anchorMenu').click();
  await page1.getByRole('menuitem', { name: 'Place Referral' }).click();
  await page1.getByLabel('Selected Provider *').locator('div').nth(3).click();
  await page1.getByText('None').click();
  await expect(page1.getByRole('button', { name: 'Place' })).toBeVisible();
  await page1.getByRole('button', { name: 'Place' }).click();

  await page1.getByRole('heading', { name: 'Automation Non Selection' }).click();
  await page1.getByRole('row', { name: 'Allscripts QA Provider 37 -' }).locator('#anchorMenu').click();
  await page1.getByRole('menuitem', { name: 'Place Referral' }).click();
  await page1.getByRole('button', { name: 'Place' }).click();
});
