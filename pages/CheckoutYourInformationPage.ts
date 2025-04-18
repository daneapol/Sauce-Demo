import { BasePage } from "./BasePage";

// Page Object for Checkout: Your Information Page

export class CheckoutYourInformationPage extends BasePage {
    protected fields = {
        firstName: 'First Name',
        lastName: 'Last Name',
        postalCode: 'Zip/Postal Code'
    };
    protected continueButton = 'Continue';

    // Populates customer information fields and clicks 'Continue' button
    submitInformation(I: CodeceptJS.I, firstName: string, lastName: string, postalCode: string) {
        console.info('Submitting customer information');
        I.fillField(this.fields.firstName, firstName);
        I.fillField(this.fields.lastName, lastName);
        I.fillField(this.fields.postalCode, postalCode);
        I.click(this.continueButton);
    }
};
