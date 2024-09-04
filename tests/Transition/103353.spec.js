// Author - Vrushali Honnatti Date: 20th August - 2024

import { test } from '@playwright/test';
import { ProviderSearchPage } from '../../pages/Transition_Pages/ProviderSearchPage';
import { ManageReferral } from '../../pages/Transition_Pages/ManageReferralPage';
import { TransitionContextNavigator } from '../../pages/Transition_Pages/TransitionContextNavigator';
import { SharedChoice } from '../../pages/Transition_Pages/SharedChoicePage';
import { LIB } from '../../bizLibs/lib';

const { user, password, QAProvider1, QAProvider2, QAProvider3 } = process.env

test('To Verify the electronic method of sharing workflow', async ({ }) => {

  test.setTimeout(5 * 60 * 1000);//5mins in milliseconds

  //Step 1 - Access : https://fhir.epic.com/. Log into Epic on FHIR with following credentials: Tslusher / Halloween1. click on 'Launching your App from Epic' under Documentation. Click on Try it. Select a Patient 'Lopez,Camila' by choosing an EPIC to test with and enter Launch URL 'https://pv05.acm.health/professional/Transition/SmartSessions.aspx'; and Token as below 'dob =% DOB % &user =% SYSLOGIN % &csn =% CSN % &user_first_name =% FNAME % &user_last_name =% LNAME % &user_provider_fhir_id =% USERPROVFHIRID % &epic_patient_id =% FHIRPATID % &encounter_date =% ENCDATE % &b2bCode = TQAH1 and click on Launch'
  //Creating an Object to LIB class
  const Library = new LIB();

  //calling HandleAppLaunch() method and passing - Patient name - MRN - Navigator page name
  const newPage = await Library.HandleAppLaunch('Cadence, Anna', 'E1703', 'Manage Referrals');

  const ManageRef = new ManageReferral(newPage);
  const ProviderSearch = new ProviderSearchPage(newPage);
  const TransContextNav = new TransitionContextNavigator(newPage);
  const sharedChoice = new SharedChoice(newPage);

  //Step 2 - Click on Create Referral card
  //Step 3 - Choose the  referral type enabled for Patient choice and click on 'Create Referral' button
  //Step 4 - Enter the zipcode and tab out
  //Step 5 - Verify the button present below the Advance search
  await ManageRef.CreateNewReferral('PatientChoice');

  //Step 6 - Select the Providers and click on 'Add # to Cart'
  //for automation - if a provider is already present, remove it
  await newPage.waitForTimeout(5000);
  await ProviderSearch.ClickRemoveProviderMenuItem();
  await ProviderSearch.ClickSearchProviderIcon();
  var index = Math.floor(Math.random() * 9) + 1;
  await ProviderSearch.AddProviderToCart(index.toString());

  //Step 7 - Verify the cart
  //Step 8 - Verify the buttons present
  //Step 9 - Click on 'Text/Email'
  //await ProviderSearch.ClickCartCount_button();
  await ProviderSearch.ClickTextEmail_PCButton();

  //Step 10 - Verify the help text or instructions
  await ProviderSearch.ValidateTextPopup_HelpText();

  //Step 11 - Verify the text box below the help text
  //Step 12 - Verify the helper text of the textbox
  //Step 13 - Enter multiple email IDs separated with comma
  await ProviderSearch.EnterRecipientsEmail("test@gmail.com, aaa@wellsky.com, bbb@allscripts.com")

  //Step 14 - Enter email ID as aaa
  await ProviderSearch.EnterYourEmail("aaa");

  //Step 15 - Enter Phone number as 000000
  await ProviderSearch.EnterYourPhone("000000");

  //Step 16 - Verify textbox below the Email IDs

  //Step 17 - Verify Your Email ID textbox
  //Step 18 - Change the email ID
  //Step 19 - Remove the Email ID and verify Share button
  await ProviderSearch.ValidateShareButtonDisabled();

  //Step 20 - Verify the text box below 'Your Email ID'
  await ProviderSearch.EnterYourEmail("aaa@google.com");
  await ProviderSearch.EnterYourName("Test Automation !@%#@%%^^&");


  //Step 21 - Remove the name and verify Share button
  await ProviderSearch.ValidateShareButtonEnabled();

  //Step 22 - Verify text box below Your Name
  //Step 23 - Verify the Share button keeping the Your Phone textbox blank
  //Step 24 - Verify Add a message to Patient textbox
  await ProviderSearch.EnterMessage("Testing@1234567");
  await ProviderSearch.EnterYourPhone("4257689000");

  //Step 25 - Enter alpha numeric - special characters and 500 characters
  //Step 26 - Verify the Share button
  await ProviderSearch.ValidateShareButtonEnabled();

  //Step 27 - Enter valid Email ID(shruthi.vs@wellsky.com) and Phone number separated by comma\r\nEnter different email ID in Your Email ID field\r\nEnter different name with special characters in Your Name field,\r\nAdd a message to Patient- Testing@1234567\r\n Click on Share
  await ProviderSearch.ClickShareButtonPopup();

  //Step 28 - Verify the Shared Choice tab for the newly inserted record
  await sharedChoice.Validate_First_row_OnceChoiceShared('central', '12hr', '1', 'Text/Email', 'test@gmail.comaaa@wellsky.combbb@allscripts.com');

  //Step 29 - Click on eye icon present in the View what you shared column
  await sharedChoice.First_ViewIconClick();

  //Step 30 - Verify the Modal
  //Step 31 - Verify the Provider
  //Step 32 - Click on Add against the Provider
  await sharedChoice.Addall_btn_click();
  await sharedChoice.CareGiverDetails("Test Automation", "4257689000");


  //Step 33 - Close the modal
  await sharedChoice.SaveAsPatientChoice();
  await TransContextNav.ClickSharedChoiceTab();

  //Step 34 - Click on ellipses under actions column
  await sharedChoice.EllipseIconClick();

  //Step 35 - Click on Resend
  await sharedChoice.Resend();

  //Step 36 - Verify the message in the 'Add a message to the Patient'
  await ProviderSearch.EnterMessage('Test Automation');
  await ProviderSearch.ClickShareButtonPopup();

  //Step 37 - Verify the email triggered to the email ID entered while sharing Providers
  //Step 38 - Open email and click the link 'Post- Acute Options'
  //Step 39 - Click on Add button against the providers and rank the providers
  //Step 40 - Enter the full name of patient or care giver and verify
  //Step 41 - Click on 'Send to Case Manager' button
  //Step 42 - Go back to the application - navigate to Providers tab
  //Step 43 - Open email and click the link 'Post- Acute Options'
  //verifying email is not possible through automation
});