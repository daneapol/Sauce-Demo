module.exports = {
    fields: {
        firstName: 'First Name',
        lastName: 'Last Name',
        postalCode: 'Zip/Postal Code'
    },
    continueButton: 'Continue',

    sendInformation(I: CodeceptJS.I, firstName: string, lastName: string, postalCode: string) {
        I.fillField(this.fields.firstName, firstName);
        I.fillField(this.fields.lastName, lastName);
        I.fillField(this.fields.postalCode, postalCode);
        I.click(this.continueButton);
    }
};
