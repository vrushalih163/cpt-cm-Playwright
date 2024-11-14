import { test, expect, chromium } from '@playwright/test';
import { LIB } from '../../bizLibs/lib';
import { ManageReferral } from '../../pages/Transition_Pages/ManageReferralPage';
import { TransitionContextNavigator } from '../../pages/Transition_Pages/TransitionContextNavigator';
import { InformationPage } from '../../pages/Transition_Pages/InformationPage';
import { FormsPage } from '../../pages/Transition_Pages/FormsPage';
import { ProviderSearchPage } from '../../pages/Transition_Pages/ProviderSearchPage';
import { LoginPage } from '../../pages/PageLogin_111';
import { IncomingReferralsEnhancedViewPage } from '../../pages/incomingReferralsEnhancedViewPage_631';
import { ViewOnlineReferralPage } from '../../pages/viewOnlineReferralPage_1473';
import { ApplicationNavigator } from '../../pages/ApplicationNavigator';
const { user, password, QAProvider1 } = process.env;
const FormName = ' 1823 - Medicaid ';
const ReferralType = 'Automation - Transportation';
const TypeOfTransport = 'ALS';
const MethodOfPayment = 'Cash';
const TripType = 'Round trip';


test('CM: Transition 2.0 Support for Transportation Fields T1 added', async ({ }) => {
  //Step 1: Launch EPIC on FHIR or Transition application
  const Library = new LIB();
  //await Library.CreateNewAdmissionForTransPatient('E3228', '1993'); 
  const newPage = await Library.HandleAppLaunch('Grand Central, John', 'E3228', 'Manage Referrals');
  const MngReferral = new ManageReferral(newPage);

  // Step 2: Click on Create referral and select 'Automation - Transportation' referral type and click on Create Referral.
  await MngReferral.CreateNewReferral(ReferralType);
  //await MngReferral.ClickFirstReferral();

  // Step 3: Navigate to Information tab
  const TranContextNav = new TransitionContextNavigator(newPage);
  await TranContextNav.ClickInformationTab();

  const InfoTab = new InformationPage(newPage);
  await InfoTab.SetProjectedDischargeDate('+1');
  await InfoTab.SetProjectedDischargeTime('11:11');
  await InfoTab.SetPrimaryDiagnosis('Automation');

  //verified the Transportation accordion is expand form by default and rest all are collapsed
  await InfoTab.ExpandRCollapseAccordion_Verification('Transportation', 'true');
  await InfoTab.ExpandRCollapseAccordion_Verification('Pickup Location', 'false');
  await InfoTab.ExpandRCollapseAccordion_Verification('Drop-off Location', 'false');
  await InfoTab.ExpandRCollapseAccordion_Verification('Additional Information', 'false');

  // Step 4: Verify the Transportation accordion
  // Transport Date - Validation check
  await InfoTab.ValidateORSet_Transportdate('11/11/1800');
  await newPage.waitForLoadState('domcontentloaded');
  await InfoTab.ValidateORSet_Transportdate('11/11/2050');
  await InfoTab.ValidateORSet_Transportdate('');
  await newPage.waitForLoadState('domcontentloaded');
  //set the today's date as transport date
  await InfoTab.ValidateORSet_Transportdate('+0');

  //get the transport date on the information tab
  var TranspDate = await InfoTab.GetTransportDate();

  // Requested pickup time - Validation check
  // await InfoTab.ValidateRequestedPickUpTime('1');
  // await InfoTab.ValidateRequestedReturnTime('1');


  // Type of Transport,method of payment and trip type selection
  await InfoTab.TypeOfTransport_selection(TypeOfTransport);
  await InfoTab.MethodOfPayment_selection(MethodOfPayment);
  await InfoTab.TripType_selection(TripType);


  // Height and weight validation and selection
  await InfoTab.ValidateORSet_HeightFt_English('10');
  await InfoTab.ValidateORSet_HeightFt_English('-1');
  await InfoTab.ValidateORSet_HeightFt_English('');
  await InfoTab.ValidateORSet_HeightFt_English('7');
  await InfoTab.ValidateORSet_HeightInch_English('13');
  await InfoTab.ValidateORSet_HeightInch_English('');
  await InfoTab.ValidateORSet_HeightInch_English('-1');
  await InfoTab.ValidateORSet_HeightInch_English('10');

  await InfoTab.HeightORWeightRadioBtn_Switcher('Height', 'Metric');
  await InfoTab.ValidateORSet_HeightCM_Metric('306');
  await InfoTab.ValidateORSet_HeightCM_Metric('');

  await InfoTab.ValidateORSet_Weightlbs_English('1000');
  await InfoTab.ValidateORSet_Weightlbs_English('');
  await InfoTab.ValidateORSet_WeightOz_English('16');
  await InfoTab.ValidateORSet_WeightOz_English('');

  await InfoTab.HeightORWeightRadioBtn_Switcher('Weight', 'Metric');
  await InfoTab.ValidateORSet_WeightKg_Metric('1000');
  await InfoTab.ValidateORSet_WeightKg_Metric('');
  await InfoTab.ValidateORSet_WeightGm_Metric('1000');
  await InfoTab.ValidateORSet_WeightGm_Metric('');

  // Step 5: Verify the Pickup Location accordion
  await InfoTab.ExpandORCollapse_Accordion('Pickup Location')
  await InfoTab.UseFacilitysAddress_Click();
  await InfoTab.UsePatientAddress_Click('Pickup');
  await InfoTab.ProviderAdressLookup_Click('Pickup');
  await InfoTab.ProviderAddress_Selection('QA Provider');

  // Get the pickup address
  const PickupAddress = await InfoTab.GetPickUpaddress();
  const [pickupAddressName, pickupAddress] = PickupAddress;

  // Step 6: Verify the drop off location accordion
  await InfoTab.ExpandORCollapse_Accordion('Drop-off Location');
  await InfoTab.UsePatientAddress_Click('Drop off');
  // await InfoTab.ProviderAdressLookup_Click('Drop off');
  // await InfoTab.ProviderAddress_Selection('QA Provider');

  // Get the drop off address
  await newPage.waitForLoadState('domcontentloaded');
  const DropOffAddress = await InfoTab.GetDropOffAddress();
  const [dropOffAddressName, dropOffAddress] = DropOffAddress;

  // Step 7: Verify the Additional Information accordion

  await InfoTab.ExpandORCollapse_Accordion('Additional Information');
  await InfoTab.AdditionalQuestions_Selection('Has Keys', 'Yes');
  await InfoTab.AdditionalQuestions_Selection('Narrow Driveway', 'No');
  await InfoTab.AdditionalQuestions_Selection('Narrow Hallways', 'Not Specified');

  // Medication Will Last for verification
  await InfoTab.AdditionalQuestions_Selection('Medicated Before Transport', 'Yes');
  await InfoTab.MedicationsWillLastFor_Visibility('Yes');
  await InfoTab.AdditionalQuestions_Selection('Medicated Before Transport', 'No');
  await InfoTab.MedicationsWillLastFor_Visibility('No');
  await InfoTab.AdditionalQuestions_Selection('Medicated Before Transport', 'Not Specified');
  await InfoTab.MedicationsWillLastFor_Visibility('Not Specified');
  await InfoTab.AdditionalQuestions_Selection('Medicated Before Transport', 'Yes');
  await InfoTab.MedicationWillLastFor('Medication will last for 1 day');


  // Number steps inside verification
  await InfoTab.ValidateORSet_NumberOfStepsInside('-1');
  await InfoTab.ValidateORSet_NumberOfStepsInside('201');
  await InfoTab.ValidateORSet_NumberOfStepsInside('30');

  // Number of steps outside verification
  await InfoTab.ValidateORSet_NumberOfStepsOutside('-1');
  await InfoTab.ValidateORSet_NumberOfStepsOutside('201');
  await InfoTab.ValidateORSet_NumberOfStepsOutside('40');

  // authorization number verification
  await InfoTab.AuthorizationNumber('AuthNumber-1234');

  // Equipements dropdown verification
  await InfoTab.SelectEquipmentOption('Airway Monitoring/Suctioning');
  await InfoTab.SelectEquipmentOption('Cardiac Monitor');

  // Direction text area field verification
  await InfoTab.Directions('Automation Directions');

  // Key Transportation questions verification
  await InfoTab.KeyTransportationQuestions('1', 'Yes');
  await InfoTab.KeyTransportationQuestions('2', 'No');
  await InfoTab.KeyTransportationQuestions('3', 'Not Specified');
  await InfoTab.KeyTransportationQuestions('4', 'Yes');
  await InfoTab.KeyTransportationQuestions('5', 'No');
  await InfoTab.KeyTransportationQuestions('6', 'Not Specified');
  await InfoTab.KeyTransportationQuestions('7', 'Yes');
  await InfoTab.KeyTransportationQuestions('8', 'No');

  // Notes text area field verification
  await InfoTab.Notes('Automation Notes');

  // Step 8: Verify the Transportation details are saved when the user switch between other tabs and context navigator.
  await TranContextNav.ClickFormsTab();

  // Add a form and come back to information tab and verify the transportation details.
  const form = new FormsPage(newPage);
  await form.SelectAForm(FormName);

  //again navigate to information tab
  await TranContextNav.ClickInformationTab();

  await InfoTab.ExpandORCollapse_Accordion('Pickup Location');
  await InfoTab.ExpandORCollapse_Accordion('Drop-off Location');
  await InfoTab.ExpandORCollapse_Accordion('Additional Information');

  await newPage.pause();
  //verify that values are retained after switching to form tab and coming back to information tab
  await InfoTab.TransportDate_Verification(TranspDate);
  await InfoTab.TypeOfTransport_Verification('ALS');
  await InfoTab.MethodOfPayment_Verification('Cash');
  await InfoTab.TripType_Verification('Round trip');
  await InfoTab.NumberOfStepInside_Verification('30')
  await InfoTab.NumberOfStepOutside_Verification('40');
  await InfoTab.AuthorizationNumber_Verification('AuthNumber-1234');
  await InfoTab.Directions_Verification('Automation Directions');

  // Select the provider and send the referral
  const providerSearch = new ProviderSearchPage(newPage);

  // Navigate to Provider tab
  await TranContextNav.ClickProvidersTab();
  await providerSearch.ClickSearchProviderButton();


  await providerSearch.SearchProvider(QAProvider1);
  await TranContextNav.ClickSendReferralButton();

  //Get the referral ID of the created referral
  const referralId = await MngReferral.GetFirstReferralID();
  //close the newPage after getting the referral ID
  await newPage.close();

  //Step 9 - Login to CM application as QA Provider 1
  const browser = await chromium.launch();
  const page = await browser.newPage();

  const Login = new LoginPage(page);
  const page1 = await Login.login(user, password);

  const AppNav = new ApplicationNavigator(page1);
  await AppNav.NavigateToChangeOrg(QAProvider1)

  // Navigate to Manage>Incoming referrals enhanced
  await AppNav.NavigateToIncomingReferralsEnhancedView();

  const IncomingReferralsEnhancedView = new IncomingReferralsEnhancedViewPage(page1);

  // Enter  the referral ID created in the  Step 2
  await IncomingReferralsEnhancedView.searchReferralId(referralId);
  await page1.waitForLoadState('domcontentloaded');
  await page1.waitForTimeout(2000);

  // Choose View online referral and click on Go
  await IncomingReferralsEnhancedView.navigateActionDDBox('View Online Referral');
  await page1.waitForLoadState('domcontentloaded');
  await page1.waitForTimeout(2000);

  // View Online Referral page verification
  const ViewOnlineRefPage = new ViewOnlineReferralPage(page1);
  await page1.waitForLoadState('domcontentloaded');
  await page1.waitForTimeout(2000);
  //scroll to the bottom of the page
  await page.evaluate(() => {
    window.scrollTo(0, document.body.scrollHeight);
  });



  await ViewOnlineRefPage.ValidateTypeOfTransport(TypeOfTransport);
  await ViewOnlineRefPage.ValidateMethodOfPayment(MethodOfPayment);
  await ViewOnlineRefPage.ValidateTripType(TripType);

  await ViewOnlineRefPage.ValidatePickUpLocation(pickupAddressName, pickupAddress);
  await ViewOnlineRefPage.ValidateDropOffLocation(dropOffAddressName, dropOffAddress);

  await ViewOnlineRefPage.ValidateHasKey('Yes');
  await ViewOnlineRefPage.ValidateNarrowDriveway('No');
  await ViewOnlineRefPage.ValidateNarrowHallway('Not Specified');
  await ViewOnlineRefPage.ValidateMedicatedBeforeTransport('Yes');
  await ViewOnlineRefPage.ValidateMedicationsWillLastFor('Medication will last for 1 day');
  await ViewOnlineRefPage.ValidateTransportation_Date(TranspDate);

  await ViewOnlineRefPage.ValidateNumberOfStepsInside('30');
  await ViewOnlineRefPage.ValidateNumberOfStepsOutside('40');

  await ViewOnlineRefPage.ValidateKeyTransportationQuestions('1', 'Yes');
  await ViewOnlineRefPage.ValidateKeyTransportationQuestions('2', 'No');
  await ViewOnlineRefPage.ValidateKeyTransportationQuestions('3', 'Not Specified');
  await ViewOnlineRefPage.ValidateKeyTransportationQuestions('4', 'Yes');
  await ViewOnlineRefPage.ValidateKeyTransportationQuestions('5', 'No');
  await ViewOnlineRefPage.ValidateKeyTransportationQuestions('6', 'Not Specified');
  await ViewOnlineRefPage.ValidateKeyTransportationQuestions('7', 'Yes');
  await ViewOnlineRefPage.ValidateKeyTransportationQuestions('8', 'No');

  await page1.close();

  //Step 10 - Launch the EPIC on FHIR in IE11 browser and verify the transportation details in Information tab.
  //***Step 10 Not automated****
});