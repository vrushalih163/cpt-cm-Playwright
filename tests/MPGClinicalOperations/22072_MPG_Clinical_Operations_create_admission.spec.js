import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/PageLogin_111';
import { ApplicationNavigator } from '../../pages/ApplicationNavigator';
import axios from 'axios';
import { ManageContextNavigator } from '../../pages/ManageContextNavigator';
import { PatientdefaultviewPage } from '../../pages/Patientdefaultviewpage_631';
import { PatientFaceSheet } from '../../pages/PatientFaceSheet_171';
import { PatientdetailsPage } from '../../pages/PatientDetailsPage_52';


const usernameapi = 'mpg_test';
const passwordapi = 'jDMagv8em9CwynzYEHqUsJ';
const url = 'https://epic-push-test.careporthealth.com/ctp/adt/';
const body = `
MSH|^~\&|Epic|Vanguard|||202410021010|F27790|ADT^A03|48295389|T|2.3
EVN|A03|202410300104
PID|||CIT1_MPG_MRN_1||Brown^Abe||19910102|F||Race W123|address line1^address line 2^city^state^96910||1234567890|9012345678|Eng|Married|reli|JS0093|400786526|||||||||||N
PD1|1|||^PrimaryDocLName^PrimaryDocFName|
PV1|1|E|POC^104^3|ER||||||||||||||||||||||||||||||||Disporzhg41||||||||202408031000|202409101700
PV2|1||||||||20301231
DG1|1|ICD-10-CM|A80.82^primary "dx ' <> (123.' primary "dx ' <> (123.' primary "dx & <> (123.' primary "dx ' <> (123.' primary "dx ' <> (123.' primary "dx ' <> (123.' primary "dx ' <> (123.' primary "dx ' <> (123.' prim end1
DG1|2|ICD-10-CM|B97.81^secondary "dx ' <> (123.' secondary "dx ' <> (123.' secondary "dx ' <> (123.' secondary "dx ' <> (123.' secondary "dx ' <> (123.' secondary "dx ' <> (123.' secondary "dx ' <> (123.' secondary "dx 'end1
IN1|1|342443GD|3080057|ZING HEALTH|address line 1^address line 2^city^state^12345|ContactLName^ContactFName|0123456789|group299004322|groupName299004322|||20160630|20240819|||subLName^subFName|Self|19410701|1060 Showalter Dr^^BLACKSBURG^VA^24060|||2|||||||||||||839963|ULGHO25JL3J||||||DISABLED|F
ZED|authhosp|yes
`;

const { user, password } = process.env


test('MPG Clinical Operations - create admission', async ({ page }) => {
    //Step - 1: Log into CM app
    const Login = new LoginPage(page);
    const page1 = await Login.login(user, password);

    //Create an object to applicationNavigator class
    const appNav = new ApplicationNavigator(page1);

    //Step - 2: Navigate to Millenium Physician Group Clinical Operations - QA
    //await appNav.NavigateToChangeOrg('Millenium Physician Group Clinical Operations - QA');

    //Step - 3: Create/Verify Connect test patient in CM



    //Step - 4: POST request to create admission from Connect ADT
    const maxRetries = 2;
    const retryInterval = 5 * 60 * 1000;
    let retries = 0;
    let response;
    let success = false;

    while (retries < maxRetries && !success) {
        try {
            response = await axios.post(url, body, {
                auth: {
                    username: usernameapi,
                    password: passwordapi
                },
                headers : {
                    'Content-Type': 'application/hl7-v2',
                }

            });
            if (response.status === 200) {
                success = true;
                console.log('Response Message', response.data);
                console.log('Response Status', response.status);
            } else{
                console.log(`Attempt ${retries + 1} failed with status; ${response.status}`);
        }
    } catch (error) {
        console.log(`Attempt ${retries + 1} failed with status; ${response.status}`);
    }
    if (!success) {
        retries++;
        if (retries < maxRetries) {
            console.log(`Retrying in 5 minutes (${retries} / ${maxRetries})`);
            await new Promise((resolve) => setTimeout(resolve, retryInterval));
        }
    }
}
if (!success) {
    console.log(`Failed to get response after max retries`);
}
expect(success).toBe(true);

//Step - 5: Verify the admission in CM
const manageContextNav = new ManageContextNavigator(page1);
await manageContextNav.navigateToPatients();

const patientDefaultView = new PatientdefaultviewPage(page1);
await patientDefaultView.SearchPatientByMRN('CIT1_MPG_MRN_1');

await patientDefaultView.selectOptionFromActionDropDown('Edit Patient');

//Step - 6: Verify patient values on Patient Face Sheet
const ptFaceSheet = new PatientFaceSheet(page1);
const expectedPatientValues = 'Patient Face Sheet, Abe Brown, 01/02/1991, CIT1_MPG_MRN_1';
await ptFaceSheet.verifyPatientValues('Patient Face Sheet', 'Abe Brown', '01/02/1991', 'CIT1_MPG_MRN_1');

//Step - 7: Verify patient values on Patient Details page
await ptFaceSheet.clickPatientDetails();
const ptDetails = new PatientdetailsPage(page1);
await ptDetails.validatePatientDetails('CIT1_MPG_MRN_1', 'Abe', 'Brown', '1/2/1991', '96910');

});